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
        const updatedOrder = await orderRepo.getById(orderId)

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
            const productsInOrder = await order.getProducts({ where: { id: productsArray[n].id } })

            if (productsInOrder.length !== 0) continue

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
            const productsInOrder = await order.getProducts({ where: { id: productsArray[n].id } })
            const productToDelete = await productRepo.getById(productsArray[n].id)
            let quantity = productsInOrder[0].products_orders.quantity

            if (productsInOrder.length === 0) continue

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
            const productsInOrder = await order.getProducts({ where: { id: products[n].id } })

            if (productsInOrder.length === 0) continue

                await this.deleteProducts(order.id, products)
                const updatedOrder = await orderRepo.getById(order.id)
                this.addProducts(updatedOrder, products)
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.changeCurrency = async (prevOrder, updatedOrder) => {
    for (let n = 0; n < updatedOrder.products.length; n++) {
        await OrderHelpers.subtractQuantityAndTotalPrice(prevOrder, updatedOrder.products[n].id)
        
        updatedOrder.dataValues.productsCount = prevOrder.dataValues.productsCount
        updatedOrder.dataValues.productsTotalPrice = prevOrder.dataValues.productsTotalPrice
        
        await orderRepo.updateOrder(updatedOrder.id, updatedOrder.dataValues)

        await orderRepo.deleteProducts(updatedOrder, updatedOrder.products[n].id)
    }

    for (let n = 0; n < updatedOrder.products.length; n++) {
        await OrderHelpers.addQuantityAndTotalPrice(updatedOrder, updatedOrder.products[n].id, updatedOrder.products[n].products_orders.quantity)
        
        await orderRepo.updateOrder(updatedOrder.id, updatedOrder.dataValues)

        orderRepo.addProducts(updatedOrder, updatedOrder.products[n].id, updatedOrder.products[n].products_orders.quantity)
    }
}

exports.updateProducts = async (order, products) => {
    for (let n = 0; n < products.length; n++) {
        const productsInOrder = await order.getProducts({ where: { id: products[n].id } })
        await Verification.IdExists(Resources.Products, products[n].id)

        if (productsInOrder.length === 0) {
            await OrderHelpers.addQuantityAndTotalPrice(order, products[n].id, products[n].quantity)

            await orderRepo.updateOrder(order.id, order.dataValues)

            orderRepo.addProducts(order, products[n].id, products[n].quantity)
        } else {
            await OrderHelpers.subtractQuantityAndTotalPrice(order, products[n].id)

            await orderRepo.updateOrder(order.id, order.dataValues)

            await orderRepo.deleteProducts(order, products[n].id)

            await OrderHelpers.addQuantityAndTotalPrice(order, products[n].id, products[n].quantity)

            await orderRepo.updateOrder(order.id, order.dataValues)

            orderRepo.addProducts(order, products[n].id, products[n].quantity)
        }
    }
}