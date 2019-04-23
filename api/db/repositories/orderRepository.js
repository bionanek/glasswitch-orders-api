const Orders = require('@db/dbHelper').Orders;
const Prods = require('@db/dbHelper').Prods

exports.createOrder = async (orderData) => {
    return await Orders.create(orderData,
            { include: [{ all: true }]});
};

exports.getAll = async () => {
    return await Orders.findAll(
        { include: [{ all: true }]})
            .map(el => el.get({ plain: true }));
};

exports.getById = async (orderId) => {
    return await Orders.findById(orderId, 
        { include: [{ all: true }]});
};

exports.addProduct = async (order, productId, quantity) => {
    return await order.addProducts(productId, quantity)
}