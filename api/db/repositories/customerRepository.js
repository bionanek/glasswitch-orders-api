const Customers = require('@db/dbHelper').Customers;
const { CustomerValidation } = require('@validation/customerValidation');

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
        const requestedCustomer = await Customers.findById(customerId);

        CustomerValidation.ValidateIdExists(requestedCustomer);

        return Customers.update(updatedCustomerData, 
            { where: { id: customerId } });
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteCustomer = async (customerId) => {
    try {
        const requestedCustomer = await Customers.findById(customerId);

        CustomerValidation.ValidateIdExists(requestedCustomer);

        return Customers.destroy(
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
        const requestedCustomer = await Customers.findById(customerId);

        CustomerValidation.ValidateIdExists(requestedCustomer);

        return requestedCustomer;
    } catch (error) {
        throw new Error(error);
    }
};