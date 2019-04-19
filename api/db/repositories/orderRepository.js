const Orders = require('@db/dbHelper').Orders;

exports.createOrder = async (orderData) => {
    return await Orders.create(orderData,
        { include: [Orders.Customer], as: 'orderId'});
};

exports.getAll = async () => {
    return await Orders.findAll(
        { include: [Orders.Customer]})
            .map(el => el.get({ plain: true }));
};

exports.getById = async (orderId) => {
    return await Orders.findById(orderId, 
        { include: [Orders.Customer] });
};