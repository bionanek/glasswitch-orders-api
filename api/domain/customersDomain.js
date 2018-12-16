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