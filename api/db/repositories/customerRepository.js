const Customers = require('@db/dbHelper').Customers;

exports.Customers = Customers;

exports.createCustomer = async (customerData) => {
    return await Customers.create(customerData);
};

exports.updateCustomer = async (customerId, updatedCustomerData) => {
    return Customers.update(updatedCustomerData, 
        { where: { id: customerId } });
};

exports.deleteCustomer = async (customerId) => {
    return Customers.destroy(
        { where: { id: customerId }, cascade: true });
};

exports.getAll = async () => {
    return await Customers.findAll(
        { include: [{ all: true }]})
            .map(el => el.get({ plain: true }));
};

exports.getById = async (customerId) => {
    return await Customers.findById(customerId, 
        { include: [{ all: true }]});
};