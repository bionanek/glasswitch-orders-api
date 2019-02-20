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
    const allCustomers = await Customers.findAll();

    if (allCustomers === null || allCustomers === undefined) { 
        throw new Error('Customers table is empty. REPO');
    }

    try {
        return allCustomers;
    } catch (error) {
        throw new Error(error);
    }
}

exports.getById = async (customerId) => {
    const requestedCustomer = await Customers.findById(customerId);

    if (requestedCustomer === null || requestedCustomer === undefined) {
        throw new Error('Customer with given ID doesn\'t exists');
    }

    try {
        return requestedCustomer;
    } catch(error) {
        throw new Error(error);
    }
};