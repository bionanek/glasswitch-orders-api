const Orders = require('@db/dbHelper').Orders;

exports.createOrder = async (orderData) => {
    return await Orders.create(orderData,
        { include: [Orders.Customer], as: 'orderId'});
};

exports.getAll = async () => {
    return await Orders.findAll(
        { include: [{ all: true }]}).map(el => el.get({ plain: true }));
};