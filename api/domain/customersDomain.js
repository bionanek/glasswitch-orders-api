const customerRepo = require('./../db/repositories/customerRepository');

exports.create = (customerData) => {
    return new Promise((resolve, reject) => {
        if (customerData === null) {
            reject(new Error('Provide Customer object to create new Customer.'));
            return;
        }

        customerRepo.createCustomer(customerData)
            .then((createdCustomer) => resolve(createdCustomer))
            .catch((error) => reject(error));
    });
};

exports.update = async (customerId, updatedCustomerData) => {
    if (updatedCustomerData === null) {
        throw new Erorr('Provide values to update.');
    }

    let affectedRows = await customerRepo.updateCustomer(customerId, updatedCustomerData);

    if (affectedRows == 0) {
        throw new Error('No customer updated.');
    }

    return affectedRows;
};

exports.delete = async (customerId) => {
    if (isNaN(customerId)) {
        throw new Error('Customer ID must be an integer. Given ID: ' + customerId);
    }

    let affectedRows = await customerRepo.deleteCustomer(customerId);

    if (affectedRows == 0) {
        throw new Error('No customer deleted.');
    }

    return affectedRows;
};

exports.getAll = async (customers) => {
    let affectedRows = await customerRepo.getAll(customers);

    if (affectedRows == 0) {
        throw new Error('No customers found.');
    }

    return affectedRows;
};

exports.getById = async (customerId) => {
    if (isNaN(customerId)) {
        throw new Error('Customer ID must be an integer. Given ID: ' + customerId);
    }

    let affectedRows = await customerRepo.getById(customerId);

    if (affectedRows == 0) {
        throw new Error('No customer found.');
    }

    return affectedRows;
};