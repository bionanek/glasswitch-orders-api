const { RequestValidationError } = require('@helpers/errors');
const { ArgumentIsNotIntError } = require('@helpers/errors');

class CustomerValidation { 
    static Validate(request, response, next) {
        try {
            switch (request.method) {
                case "POST":
                    CustomerValidation.ValidateCreate(request.body);
                    break;
                case "GET":
                    CustomerValidation.ValidateId(request.params.customerId);
                    break;
                case "PATCH":
                    CustomerValidation.ValidateId(request.params.customerId);
                    CustomerValidation.ValidateUpdate(request.body);
                    break;
                case "DELETE":
                    CustomerValidation.ValidateId(request.params.customerId);
                    break;
            }
            next();
        } catch (error) {
            return response.status(error.code).json(error);
        }
    }

    static ValidateCreate(customerData) {
        CustomerValidation.ValidateAllFieldsUndefined(customerData);

        // if (!customerData.name || !/\S/.test(customerData.name)) {
        //     throw new RequestValidationError('Name can\'t be empty');
        // }
    }

    static ValidateAllFieldsUndefined(customerData) {
        if (!customerData.name
            || !customerData.email
            || !customerData.vatNumber) {
            throw new RequestValidationError('One or more request fields are missing.');
        }
    }

    static ValidateId(customerId) {
        if (isNaN(customerId)) {
            throw new ArgumentIsNotIntError('Customer ID must be an integer. Given ID: ' + customerId);
        }
    }

    static ValidateUpdate(updatedCustomerData) {
        if (updatedCustomerData === "" || updatedCustomerData === null || updatedCustomerData === undefined) {
            throw new UpdateError('Provide values to update.');
        }
    }
}

module.exports = {
    CustomerValidation
};