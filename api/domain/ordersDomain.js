const orderRepo = require('@repos/orderRepository');
const { Verification, Resources } = require('@verify/verification');
const { IdNotFound, SequelizeError } = require('@helpers/errors');

exports.create = async (orderData) => {
    try {
        return await orderRepo.createOrder(orderData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (orderId, updatedOrderData) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId);

        return await orderRepo.updateOrder(orderId, updatedOrderData);
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.');
        }
        throw new IdNotFound('Order with given ID doesn\'t exist. No order was updated.');
    }
};

exports.delete = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId);
        
        return await orderRepo.deleteOrder(orderId);
    } catch (error) {
        throw new IdNotFound('Order with given ID doesn\'t exist. No order was deleted.');
    }
};

exports.getAll = async () => {
    try {
        return await orderRepo.getAll();
    } catch (error) {
        throw new Error('No orders were found.')
    }
};

exports.getById = async (orderId) => {
    try {
        await Verification.IdExists(Resources.Orders, orderId);

        return await orderRepo.getById(orderId);
    } catch (error) {
        throw new IdNotFound('Order with given ID doesn\'t exist.');
    }
};