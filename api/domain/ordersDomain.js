const orderRepo = require('@repos/orderRepository')
const { Verification, Resources } = require('@verify/verification')
const { IdNotFound, SequelizeError } = require('@helpers/errors')
const { OrderHelpers } = require('@repos/orderHelpers/orderHelpers')

exports.create = async (orderData) => {
    try {
        await Verification.IdExists(Resources.Customers, orderData.customerId)

        for (let n = 0; n < orderData.wantedProducts.length; n++) 
            await Verification.IdExists(Resources.Products, orderData.wantedProducts[n].id)
    
        const order = await orderRepo.createOrder(orderData)

        return this.addProduct(order, orderData.wantedProducts) 
    } catch (error) {
        throw new IdNotFound(error.message + ' && Order has not been placed!')
    }
}

exports.update = async (orderId, updatedOrderData) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)
        const updatedProducts = updatedOrderData.updatedProducts
        const order = await orderRepo.getById(orderId)

        await orderRepo.updateOrder(orderId, updatedOrderData)
        const updatedOrder = await orderRepo.getById(orderId)

        if (order.currency !== updatedOrderData.currency)
            await this.changeCurrency(order, updatedOrder)
        
        await this.updateProducts(order, updatedProducts)

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

exports.addProduct = async (order, products) => {
    try {
        for (let n = 0; n < products.length; n++) {
            const productsInOrder = await order.getProducts({ where: { id: products[n].id } })

            if (productsInOrder.length === 0) {
                await OrderHelpers.addQuantityAndTotalPrice(order, products[n].id, products[n].quantity)

                await orderRepo.updateOrder(order.id, order.dataValues)

                orderRepo.addProduct(order, products[n].id, products[n].quantity)
            }
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.deleteProduct = async (orderId, products) => {
    try {
        const order = await orderRepo.getById(orderId)
        
        for (let n = 0; n < products.length; n++) {
            const productsInOrder = await order.getProducts({ where: { id: products[n].id } })

            if (productsInOrder.length !== 0) {
                await OrderHelpers.substractQuantityAndTotalPrice(order, products[n].id)

                await orderRepo.updateOrder(order.id, order.dataValues)

                orderRepo.deleteProduct(order, products[n].id)
            }
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.changeQuantity = async (order, products) => {
    try {
        for (let n = 0; n < products.length; n++) {
            const productsInOrder = await order.getProducts({ where: { id: products[n].id } })

            if (productsInOrder.length !== 0) {
                await this.deleteProduct(order.id, products)

                const updatedOrder = await orderRepo.getById(order.id)

                this.addProduct(updatedOrder, products)
            }
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.changeCurrency = async (prevOrder, updatedOrder) => {
    await this.deleteProduct(updatedOrder.id, updatedOrder.products)

    for (let n = 0; n < prevOrder.products.length; n++) {
        const productsInOrder = prevOrder.products[n].products_orders

        await OrderHelpers.addQuantityAndTotalPrice(updatedOrder, productsInOrder.productId, productsInOrder.quantity)

        orderRepo.addProduct(updatedOrder, productsInOrder.productId, productsInOrder.quantity)
        // await OrderHelpers.addQuantityAndTotalPrice(updatedOrder, productsInOrder.productId, productsInOrder.quantity)

        // orderRepo.addProduct(updatedOrder, productsInOrder.productId, productsInOrder.quantity)
    }
}

exports.updateProducts = async (order, products) => {
    for (let n = 0; n < products.length; n++) {
        const productsInOrder = await order.getProducts({ where: { id: products[n].id } })
        await Verification.IdExists(Resources.Products, products[n].id)

        if (productsInOrder.length === 0) {
            await OrderHelpers.addQuantityAndTotalPrice(order, products[n].id, products[n].quantity)

            await orderRepo.updateOrder(order.id, order.dataValues)

            orderRepo.addProduct(order, products[n].id, products[n].quantity)
        } else {
            await OrderHelpers.substractQuantityAndTotalPrice(order, products[n].id)

            await orderRepo.updateOrder(order.id, order.dataValues)

            await orderRepo.deleteProduct(order, products[n].id)

            await OrderHelpers.addQuantityAndTotalPrice(order, products[n].id, products[n].quantity)

            await orderRepo.updateOrder(order.id, order.dataValues)

            orderRepo.addProduct(order, products[n].id, products[n].quantity)
        }
    }
}