const Customers = require('./../dbHelper').Customers;

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
        return Customers.update(updatedCustomerData, { where: { id: customerId } });
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteCustomer = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    if (requestedCustomer === null || requestedCustomer === undefined) {
        throw new Error('Customer with given ID doesn\'t exist');
    }

    try {
        return Customers.destroy({ where: { id: customerId }, cascade: true });
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAll = async () => {
    let allCustomers;

    try {
        allCustomers = await Customers.findAll();
    } catch (error) {
        throw new Error(error);
    }

    if (allCustomers === null || allCustomers === undefined) { 
        throw new Error('Customers table is empty. REPO');
    }
    
    return allCustomers;
}

exports.getById = async (customerId) => {
    let requestedCustomer;

    try {
        requestedCustomer = await Customers.findById(customerId);
    } catch (error) {
        throw new Error(error);
    }

    if (requestedCustomer === null || requestedCustomer === undefined) {
        throw new Error('Customer with given ID doesn\'t exists');
    }

    return requestedCustomer;
};