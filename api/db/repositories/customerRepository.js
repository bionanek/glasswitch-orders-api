const Customers = require('./../dbHelper').Customers;

exports.Customers = Customers;

exports.createCustomer = (customerData) => {
    return new Promise((resolve, reject) => {
        Customers.create(customerData)
            .then((createdCustomer) => {
                resolve(createdCustomer);
            })
            .catch((error) => {
                reject(error);
            })
    });
};

exports.updateCustomer = async (customerId, updatedCustomerData) => {
    try {
        return Customers.update(updatedCustomerData, { where: { id: customerId } });
    } catch(error) {
        throw new Error(error);
    }
};