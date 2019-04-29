const orderRepo = require('@repos/orderRepository')
const { Verification, Resources } = require('@verify/verification')
const { IdNotFound, SequelizeError } = require('@helpers/errors')
const OrderCounters = require('@repos/orderCounters/orderCounters').OrderCounters

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

        return await orderRepo.updateOrder(orderId, updatedOrderData)
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
        
        return await orderRepo.deleteOrder(orderId)
    } catch (error) {
        throw new IdNotFound(error.message + ' && No order was deleted.')
    }
}

exports.getAll = async () => {
    try {
        return await orderRepo.getAll()
    } catch (error) {
        throw new Error('No orders were found.')
    }
}

exports.getById = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)

        return await orderRepo.getById(orderId)
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.addProduct = async (order, products) => {
    try {
        for (let n = 0; n < products.length; n++) {
            await Verification.IdExists(Resources.Products, products[n].id)
            await OrderCounters.AddCounters(order, products[n].id, products[n].quantity)
        }

        return orderRepo.addProduct(order, products)
    } catch (error) {
        throw new IdNotFound(error.message)
    }
}

exports.deleteProduct = async (order, productId) => {
    try {
        await Verification.IdExists(Resources.Orders, order.id)
        await OrderCounters.SubsCounters(order, productId)

        return await orderRepo.deleteProduct(order, productId)
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exist.')
    }
}

exports.changeQuantity = async (order, productId, quantity) => {
    try {

    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exist.')
    }
}