const customerRepo = require('@repos/customerRepository');
const { IdNotFound } = require('@helpers/errors');
const { SequelizeError } = require('@helpers/errors');

exports.create = async (customerData) => {
    try {
        return await customerRepo.createCustomer(customerData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (customerId, updatedCustomerData) => {
    try {
        await customerRepo.getById(customerId);

        return await customerRepo.updateCustomer(customerId, updatedCustomerData);
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.');
        }
        throw new IdNotFound('Customer with given ID doesn\'t exists. No customer was updated.');
    }
};

exports.delete = async (customerId) => {
    try {
        return await customerRepo.deleteCustomer(customerId);
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists. No customer was deleted.');
    }
};

exports.getAll = async () => {
    try {
        return await customerRepo.getAll();
    } catch (error) {
        throw new Error('No customers were found.')
    }
};

exports.getById = async (customerId) => {
    try {
        return await customerRepo.getById(customerId);
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists.');
    }
};