const orderRepo = require('@repos/orderRepository')
const { Verification, Resources } = require('@verify/verification')
const { IdNotFound, SequelizeError } = require('@helpers/errors')
const OrderHelpers = require('@repos/orderHelpers/orderHelpers').OrderHelpers

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

exports.update = async (order, updatedOrderData) => {
    try {
        await Verification.IdExists(Resources.Orders, order.id)
        let updatedProducts = updatedOrderData.updatedProducts

        if (order.currency !== updatedOrderData.currency)
            await OrderHelpers.CurrencyChange(order, updatedOrderData)
        
        orderRepo.updateOrder(order.id, updatedOrderData)
        const updatedOrder = await orderRepo.getById(order.id)

        await OrderHelpers.UpdateProducts(updatedOrder, updatedProducts)

        return orderRepo.updateOrder(order.id, updatedOrderData)
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

exports.getAll = async () => {
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
            await OrderHelpers.AddCounters(order, products[n].id, products[n].quantity)
            orderRepo.addProduct(order, products[n].id, products[n].quantity)
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.deleteProduct = async (order, products) => {
    try {
        for (let n = 0; n < products.length; n++) {
            let validateProduct = await order.getProducts({ where: { id: products[n].id } })

            if (validateProduct.length !== 0) {
                await OrderHelpers.SubsCounters(order, products[n].id)
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
            let validateProduct = await order.getProducts({ where: { id: products[n].id } })

            if (validateProduct.length !== 0) {
                await OrderHelpers.SubsCounters(order, products[n].id)
                await orderRepo.deleteProduct(order, products[n].id)

                await OrderHelpers.AddCounters(order, products[n].id, products[n].quantity)
                orderRepo.addProduct(order, products[n].id, products[n].quantity)
            }
        }
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}