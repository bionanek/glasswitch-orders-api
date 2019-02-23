const { RequestValidationError } = require('@helpers/errors');

class CustomerValidation {
    static CustomerNameError(customerData) {
        if (!customerData.name || !/\S/.test(customerData.name)) {
            throw new RequestValidationError('Name can\'t be empty');
        }
    }

    static CustomerIdError(customerId) {
        if (isNaN(customerId)) {
            throw new ArgumentIsNotIntError('Customer ID must be an integer. Given ID: ' + customerId);
        }
    }

    static CustomerUpdateError(updatedCustomerData) {
        if (updatedCustomerData === null || updatedCustomerData === undefined) {
            throw new Error('Provide values to update.');
        }
    }
    
    static CustomerAffectedRowsError(affectedRows) {
        if (affectedRows === 0) {
            throw new Error('No customer updated. || No customer deleted.');
        }
    }

    static CustomerFetchedRowsError(fetchedRows) {
        if (fetchedRows === 0) {
            throw new Error('No customers found. || No customer found.');
        }
    }
}

module.exports = {
    CustomerValidation,
};