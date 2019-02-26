const customerRepo = require('@repos/customerRepository');
const { IdNotFound } = require('@helpers/errors');
const { RecordsEmptyError } = require('@validation/customerValidation');

exports.create = async (customerData) => {
    try {
        return await customerRepo.createCustomer(customerData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (customerId, updatedCustomerData) => {
    let affectedRows = await customerRepo.updateCustomer(customerId, updatedCustomerData);

    if (affectedRows === 0) {
        throw new Error('No customer updated.');
    }

    return affectedRows;
};

exports.delete = async (customerId) => {
    let affectedRows = await customerRepo.deleteCustomer(customerId);

    if (affectedRows === 0) {
        throw new RecordsEmptyError('No customer deleted.');
    }

    return affectedRows;
};

exports.getAll = async () => {
    let fetchedRows = await customerRepo.getAll();

    //IF TABLE IS EMPTY STILL RETURNS INSTEAD OF THROWING AN ERROR
    if (fetchedRows === [0]) {
        throw new RecordsEmptyError('No customers found.');
    }

    return fetchedRows;
};

exports.getById = async (customerId) => {
    try {
        const fetchedRow = await customerRepo.getById(customerId);

        return fetchedRow;
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exists.');
    }
};