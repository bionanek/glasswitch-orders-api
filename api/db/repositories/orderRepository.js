const Orders = require('@db/dbHelper').Orders

exports.createOrder = (orderData) => {
    return Orders.create(orderData,
        { include: [{ all: true }]})
}

exports.updateOrder = (orderId, updatedOrderData) => {
    return Orders.update(updatedOrderData,
        { where: { id: orderId } })
}

exports.deleteOrder = (orderId) => {
    return Orders.destroy(
        { where: { id: orderId }, cascade: true })
}

exports.getAll = () => {
    return Orders.findAll(
        { include: [{ all: true }]})
            .map(el => el.get({ plain: true }))
}

exports.getById = (orderId) => {
    return Orders.findById(orderId, 
        { include: [{ all: true }]})
}

exports.addProduct = (order, productId, quantity) => {
    return order.addProducts(productId, 
        { through: { quantity: quantity } })
}

exports.deleteProduct = (order, productId) => {
    return order.removeProducts(productId)
}