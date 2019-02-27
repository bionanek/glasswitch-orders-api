const customerRepo = require('@repos/customerRepository');
const { IdNotFound } = require('@helpers/errors');

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

        const affectedRows = await customerRepo.updateCustomer(customerId, updatedCustomerData);

        return affectedRows;
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists. No customer was updated.');
    }
};

exports.delete = async (customerId) => {
    try {
        const affectedRows = await customerRepo.deleteCustomer(customerId);

        return affectedRows;
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists. No customer was deleted.');
    }
};

exports.getAll = async () => {
    try {
        const fetchedRows = await customerRepo.getAll();

        return fetchedRows;
    } catch (error) {
        throw new Error('No customers were found.')
    }
};

exports.getById = async (customerId) => {
    try {
        const fetchedRow = await customerRepo.getById(customerId);

        return fetchedRow;
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists.');
    }
};