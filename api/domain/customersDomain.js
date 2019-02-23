const customerRepo = require('@repos/customerRepository');
const { CustomerValidation } = require('@validation/customerValidation');

exports.create = async (customerData) => {
    CustomerValidation.CustomerNameError(customerData);

    try {
        return await customerRepo.createCustomer(customerData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (customerId, updatedCustomerData) => {
    CustomerValidation.CustomerUpdateError(updatedCustomerData);

    let affectedRows = await customerRepo.updateCustomer(customerId, updatedCustomerData);

    CustomerValidation.CustomerAffectedRowsError(affectedRows);
    
    return affectedRows;
};

exports.delete = async (customerId) => {
    CustomerValidation.CustomerIdError(customerId);

    let affectedRows = await customerRepo.deleteCustomer(customerId);

    CustomerValidation.CustomerAffectedRowsError(affectedRows);

    return affectedRows;
};

exports.getAll = async () => {
    let fetchedRows = await customerRepo.getAll();

    CustomerValidation.CustomerFetchedRowsError(fetchedRows);

    return fetchedRows;
};

exports.getById = async (customerId) => {
    CustomerValidation.CustomerIdError(customerId);

    let fetchedRow = await customerRepo.getById(customerId);

    CustomerValidation.CustomerFetchedRowsError(fetchedRow);

    return fetchedRow;
};