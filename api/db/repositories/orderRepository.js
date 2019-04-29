const Orders = require('@db/dbHelper').Orders

exports.createOrder = async (orderData) => {
    return Orders.create(orderData,
        { include: [{ all: true }]})
}

exports.updateOrder = async (orderId, updatedOrderData) => {
    return Orders.update(updatedOrderData,
        { where: { id: orderId } })
}

exports.deleteOrder = async (orderId) => {
    return Orders.destroy(
        { where: { id: orderId }, cascade: true })
}

exports.getAll = async () => {
    return Orders.findAll(
        { include: [{ all: true }]})
            .map(el => el.get({ plain: true }))
}

exports.getById = async (orderId) => {
    return Orders.findById(orderId, 
        { include: [{ all: true }]})
}

exports.addProduct = async (order, productId, quantity) => {
    return order.addProduct(productId, 
        { through: { quantity: quantity } })
}

exports.deleteProduct = async (order, productId) => {
    return order.removeProducts(productId)
}