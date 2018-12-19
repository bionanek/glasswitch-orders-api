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