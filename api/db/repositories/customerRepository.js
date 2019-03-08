const Customers = require('@db/dbHelper').Customers;
const { Verificate } = require('@repos/verification/verificate');

exports.Customers = Customers;

exports.createCustomer = async (customerData) => {
    return await Customers.create(customerData);
};

exports.updateCustomer = async (customerId, updatedCustomerData) => {
    const requestedCustomer = await Customers.findById(customerId);

    Verificate.IdVerification(requestedCustomer);

    return Customers.update(updatedCustomerData, 
        { where: { id: customerId } });
};

exports.deleteCustomer = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    Verificate.IdVerification(requestedCustomer);

    return Customers.destroy(
        { where: { id: customerId }, cascade: true });
};

exports.getAll = async () => {
    return await Customers.findAll();
};

exports.getById = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    Verificate.IdVerification(requestedCustomer);

    return requestedCustomer;
};