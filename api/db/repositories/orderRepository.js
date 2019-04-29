const Orders = require('@db/dbHelper').Orders

exports.createOrder = async (orderData) => {
    return Orders.create(orderData,
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
    return Orders.findById(orderId, 
        { include: [{ all: true }]})
}

exports.addProduct = async (order, products) => {
    for (let n = 0; n < products.length; n++) {
        order.addProduct(products[n].id, 
            { through: { quantity: products[n].quantity } })
    }
}

exports.deleteProduct = async (order, productId) => {
    return await order.removeProducts(productId)
}

exports.changeQuantity = async (order, productId, quantity) => {
    
}