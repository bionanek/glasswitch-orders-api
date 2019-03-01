const Customers = require('@db/dbHelper').Customers;

exports.Customers = Customers;

exports.createCustomer = async (customerData) => {
    try {
        return await Customers.create(customerData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateCustomer = async (customerId, updatedCustomerData) => {
    try {
        return await Customers.update(updatedCustomerData, 
            { where: { id: customerId } });
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteCustomer = async (customerId) => {
    try {
        return await Customers.destroy(
            { where: { id: customerId }, cascade: true });
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAll = async () => {
    try {
        return await Customers.findAll();
    } catch (error) {
        throw new Error(error);
    }
};

exports.getById = async (customerId) => {
    try {
        return await Customers.findById(customerId);
    } catch (error) {
        throw new Error(error);
    }
};