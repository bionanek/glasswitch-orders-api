const ordersDomain = require('@domains/ordersDomain');

exports.create = async (request, response, next) => {
    try {
        const orderData = request.body;
        const order = await ordersDomain.create(orderData);

        response.status(200).json(order);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.update = async (request, response, next) => {
    try {
        const updatedOrderData = request.body;
        const orderId = request.params.orderId;
        const affectedRows = await ordersDomain.update(orderId, updatedOrderData);

        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.delete = async (request, response, next) => {
    try {
        const orderId = request.params.orderId;
        const affectedRows = await ordersDomain.delete(orderId);
        
        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.getAll = async (request, response, next) => {
    try {
        const orders = await ordersDomain.getAll();

        response.status(200).json(orders);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.getById = async (request, response, next) => {
    try {
        const order = await ordersDomain.getById(request.params.orderId);

        response.status(200).json(order);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.addProduct = async (request, response, next) => {
    try {
        const order = await ordersDomain.getById(request.params.orderId)
        const product = await ordersDomain.addProduct(order, request.body.productId, request.body.quantity)
        
        response.status(200).json(product)
    } catch (error) {
        response.status(error.code).json(error);
    }
}