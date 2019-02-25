const customerRepo = require('@repos/customerRepository');
const { CustomerValidation } = require('@validation/customerValidation');

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
        throw new Error('No customer deleted.');
    }

    return affectedRows;
};

exports.getAll = async () => {
    let fetchedRows = await customerRepo.getAll();

    if (fetchedRows === 0) {
        throw new Error('No customers found.');
    }

    return fetchedRows;
};

exports.getById = async (customerId) => {
    let fetchedRow = await customerRepo.getById(customerId);

    if (fetchedRow === 0) {
            throw new Error('No customer found.');
    }

    return fetchedRow;
};