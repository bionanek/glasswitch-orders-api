const customerRepo = require('@repos/customerRepository');
const { Verification, Resources } = require('@verify/verification');
const { IdNotFound, SequelizeError } = require('@helpers/errors');

exports.create = async (customerData) => {
    try {
        return await customerRepo.createCustomer(customerData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (customerId, updatedCustomerData) => {
    try {
        await Verification.IdExists(Resources.Customers, customerId);
        
        return await customerRepo.updateCustomer(customerId, updatedCustomerData);
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.');
        }
        throw new IdNotFound('Customer with given ID doesn\'t exist. No customer was updated.');
    }
};

exports.delete = async (customerId) => {
    try {
        await Verification.IdExists(Resources.Customers, customerId);

        return await customerRepo.deleteCustomer(customerId);
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exist. No customer was deleted.');
    }
};

exports.getAll = async () => {
    try {
        return await customerRepo.getAll();
    } catch (error) {
        throw new Error('No customers were found.')
    }
};

exports.getById = async (customerId) => {
    try {
        await Verification.IdExists(Resources.Customers, customerId);

        return await customerRepo.getById(customerId);
    } catch (error) {
        throw new IdNotFound('Customer with given ID doesn\'t exist.');
    }
};