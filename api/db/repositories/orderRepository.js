const Orders = require('@db/dbHelper').Orders;

exports.createOrder = async (orderData) => {
    return await Orders.create(orderData,
        { include: [Orders.Customer], as: 'orderId'});
};