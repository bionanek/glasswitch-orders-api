const Orders = require('@db/dbHelper').Orders

exports.createOrder = async (orderData) => {
    return await Orders.create(orderData,
            { include: [{ all: true }]})
}

exports.updateOrder = async (orderId, updatedOrderData) => {
    return await Orders.update(updatedOrderData,
        { where: { id: orderId } })
}

exports.deleteOrder = async (orderId) => {
    return await Orders.destroy(
        { where: { id: orderId }, cascade: true })
}

exports.getAll = async () => {
    return await Orders.findAll(
        { include: [{ all: true }]})
            .map(el => el.get({ plain: true }))
}

exports.getById = async (orderId) => {
    return await Orders.findById(orderId, 
        { include: [{ all: true }]})
}

exports.addProduct = async (order, productId, quantity) => {
    try {
        order.dataValues.productsCount += quantity
        this.updateOrder(order.dataValues.id, order.dataValues)

        return await order.addProducts(productId, { through: { quantity: quantity } })
    } catch (error) {
        throw new Error(error)
    }
}