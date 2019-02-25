const { RequestValidationError } = require('@helpers/errors');

class CustomerValidation {
    static Validate(request) {
        switch(request.method) {
            case "POST":
                CustomerValidation.ValidateCreate(request.body);
                break;
            case "GET":

                break;
            case "PATCH":

                break;
            case "DELETE":

                break;
        }
    }

    static ValidateCreate(customerData) {
        CustomerValidation.CustomerNameValidate(customerData);
    }
    
    static CustomerNameValidate(customerData) {
        if (!customerData.name || !/\S/.test(customerData.name)) {
            throw new RequestValidationError('Name can\'t be empty');
        }
    }

    static CustomerIdValidate(customerId) {
        if (isNaN(customerId)) {
            throw new ArgumentIsNotIntError('Customer ID must be an integer. Given ID: ' + customerId);
        }
    }

    static CustomerUpdateValidate(updatedCustomerData) {
        if (updatedCustomerData === "" || updatedCustomerData === null || updatedCustomerData === undefined) {
            throw new Error('Provide values to update.');
        }
    }
}



module.exports = {
    CustomerValidation,
};