const Customers = require('@db/dbHelper').Customers;
const { Validate } = require('@repos/validators/validators');

exports.Customers = Customers;

exports.createCustomer = async (customerData) => {
    return await Customers.create(customerData);
};

exports.updateCustomer = async (customerId, updatedCustomerData) => {
    const requestedCustomer = await Customers.findById(customerId);

    Validate.ValidateIdExists(requestedCustomer);

    return Customers.update(updatedCustomerData, 
        { where: { id: customerId } });
};

exports.deleteCustomer = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    Validate.ValidateIdExists(requestedCustomer);

    return Customers.destroy(
        { where: { id: customerId }, cascade: true });
};

exports.getAll = async () => {
    return await Customers.findAll();
};

exports.getById = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    Validate.ValidateIdExists(requestedCustomer);

    return requestedCustomer;
};