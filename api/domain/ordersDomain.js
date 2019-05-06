const orderRepo = require('@repos/orderRepository')
const productRepo = require('@repos/productRepository')
const { Verification, Resources } = require('@verify/verification')
const { IdNotFound, SequelizeError } = require('@helpers/errors')
const { OrderHelpers } = require('@repos/orderHelpers/orderHelpers')

exports.create = async (orderData) => {
    try {
        await Verification.IdExists(Resources.Customers, orderData.customerId)

        for (let n = 0; n < orderData.wantedProducts.length; n++) 
            await Verification.IdExists(Resources.Products, orderData.wantedProducts[n].id)
    
        const order = await orderRepo.createOrder(orderData)

        return this.addProducts(order, orderData.wantedProducts) 
    } catch (error) {
        throw new IdNotFound(error.message + ' && Order has not been placed!')
    }
}

exports.update = async (orderId, updatedOrderData) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)
        const updatedProducts = updatedOrderData.updatedProducts
        const order = await orderRepo.getById(orderId)

        await this.updateProducts(order, updatedProducts)

        await orderRepo.updateOrder(orderId, updatedOrderData)
        let updatedOrder = await orderRepo.getById(orderId)

        if (order.currency !== updatedOrderData.currency)
            await this.changeCurrency(order, updatedOrder)
        
        return orderRepo.updateOrder(orderId, updatedOrderData)
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.')
        }
        throw new IdNotFound(error.message + ' && None order was updated.')
    }
}

exports.delete = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)
        
        return orderRepo.deleteOrder(orderId)
    } catch (error) {
        throw new IdNotFound(error.message + ' && No order was deleted.')
    }
}

exports.getAll = () => {
    try {
        return orderRepo.getAll()
    } catch (error) {
        throw new Error('No orders were found.')
    }
}

exports.getById = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)

        return orderRepo.getById(orderId)
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.addProducts = async (order, productsArray) => {
    try {
        for (let n = 0; n < productsArray.length; n++) {
            const productInOrder = await order.getProducts({ where: { id: productsArray[n].id } })

            if (productInOrder.length !== 0) continue
            const product = await productRepo.getById(productsArray[n].id)
            
            await OrderHelpers.addQuantityAndTotalPrice(order, product, productsArray[n].quantity)
            await orderRepo.updateOrder(order.id, order.dataValues)
            orderRepo.addProducts(order, productsArray[n].id, productsArray[n].quantity)
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.deleteProducts = async (orderId, productsArray) => {
    try {
        const order = await orderRepo.getById(orderId)

        for (let n = 0; n < productsArray.length; n++) {
            const productInOrder = await order.getProducts({ where: { id: productsArray[n].id } })
            
            if (productInOrder.length === 0) continue
            const productToDelete = await productRepo.getById(productsArray[n].id)
            const quantity = productInOrder[0].products_orders.quantity

            await OrderHelpers.subtractQuantityAndTotalPrice(order, productToDelete, quantity)
            await orderRepo.updateOrder(order.id, order.dataValues)
            orderRepo.deleteProducts(order, productsArray[n].id)
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.changeQuantity = async (order, products) => {
    try {
        for (let n = 0; n < products.length; n++) {
            const productInOrder = await order.getProducts({ where: { id: products[n].id } })

            if (productInOrder.length === 0) continue

                await this.deleteProducts(order.id, products)
                const updatedOrder = await orderRepo.getById(order.id)
                this.addProducts(updatedOrder, products)
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.changeCurrency = async (prevOrder, updatedOrder) => {
    const productsToUpdate = updatedOrder.products

    await this.deleteProductsOldCurrency(prevOrder, updatedOrder, productsToUpdate)
    await this.addProductsNewCurrency(updatedOrder, productsToUpdate)
}

exports.deleteProductsOldCurrency = async (prevOrder, updatedOrder, productsToUpdate) => {
    for (let n = 0; n < productsToUpdate.length; n++) {
        const productInOrder = await prevOrder.getProducts({ where: { id: productsToUpdate[n].id } })
        const product = await productRepo.getById(productsToUpdate[n].id)
        const prevQuantity = productInOrder[0].products_orders.quantity

        await OrderHelpers.subtractQuantityAndTotalPrice(prevOrder, product, prevQuantity)

        updatedOrder.dataValues.productsCount = prevOrder.dataValues.productsCount
        updatedOrder.dataValues.productsTotalPrice = prevOrder.dataValues.productsTotalPrice

        await orderRepo.updateOrder(updatedOrder.id, updatedOrder.dataValues)
        await orderRepo.deleteProducts(updatedOrder, productsToUpdate[n].id)
    }
}

exports.addProductsNewCurrency = async (updatedOrder, productsToUpdate) => {
    for (let n = 0; n < updatedOrder.products.length; n++) {
        const product = await productRepo.getById(productsToUpdate[n].id)
        const newQuantity = productsToUpdate[n].products_orders.quantity

        await OrderHelpers.addQuantityAndTotalPrice(updatedOrder, product, newQuantity)
        await orderRepo.updateOrder(updatedOrder.id, updatedOrder.dataValues)
        orderRepo.addProducts(updatedOrder, product.id, newQuantity)
    }
}

exports.updateProducts = async (order, productsArray) => {
    for (let n = 0; n < productsArray.length; n++) {
        const productInOrder = await order.getProducts({ where: { id: productsArray[n].id } })
        const product = await productRepo.getById(productsArray[n].id)
        const newQuantity = productsArray[n].quantity

        await Verification.IdExists(Resources.Products, product.id)

        if (productInOrder.length === 0) {
            await this.updateOrderNewProducts(order, product, newQuantity)
        } else {
            const prevQuantity = productInOrder[0].products_orders.quantity
            await this.updateOrderQuantityUpdate(order, product, prevQuantity, newQuantity)
        }
    }
}

exports.updateOrderNewProducts = async (order, product, quantity) => {
    await OrderHelpers.addQuantityAndTotalPrice(order, product, quantity)
    await orderRepo.updateOrder(order.id, order.dataValues)
    orderRepo.addProducts(order, product.id, quantity)
}

exports.updateOrderQuantityUpdate = async (order, product, prevQuantity, newQuantity) => {
    await OrderHelpers.subtractQuantityAndTotalPrice(order, product, prevQuantity)
    await orderRepo.updateOrder(order.id, order.dataValues)
    await orderRepo.deleteProducts(order, product.id)

    await OrderHelpers.addQuantityAndTotalPrice(order, product, newQuantity)
    await orderRepo.updateOrder(order.id, order.dataValues)
    orderRepo.addProducts(order, product.id, newQuantity)
}