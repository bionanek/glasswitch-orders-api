const orderRepo = require('@repos/orderRepository')
const { Verification, Resources } = require('@verify/verification')
const { IdNotFound, SequelizeError } = require('@helpers/errors')
const OrderCounters = require('@repos/orderCounters/orderCounters').OrderCounters

exports.create = async (orderData) => {
    try {
        await Verification.IdExists(Resources.Customers, orderData.customerId)

        return await orderRepo.createOrder(orderData)
    } catch (error) {
        if (error.name.includes("IDError")) {
            throw new IdNotFound('Customer has not been found!')
        }
        throw new Error(error)
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
        throw new IdNotFound('Order with given ID doesn\'t exist. No order was updated.')
    }
}

exports.delete = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId)
        
        return await orderRepo.deleteOrder(orderId)
    } catch (error) {
        throw new IdNotFound('Order with given ID doesn\'t exist. No order was deleted.')
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
        throw new IdNotFound('Order with given ID doesn\'t exist.')
    }
}

exports.addProduct = async (order, productId, quantity) => {
    try {
        await Verification.IdExists(Resources.Orders, order.id)
        await Verification.IdExists(Resources.Products, productId)
        await OrderCounters.TotalCount(order, productId, quantity)

        return await orderRepo.addProduct(order, productId, quantity)
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exist.')
    }
}

exports.deleteProduct = async (order, productId) => {
    try {
        await Verification.IdExists(Resources.Orders, order.id)
        await OrderCounters.DeleteCount(order, productId)

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