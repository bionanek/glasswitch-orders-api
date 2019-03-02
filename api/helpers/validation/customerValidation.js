const { RequestValidationError } = require('@helpers/errors');
const { ArgumentIsNotIntError } = require('@helpers/errors');
const { UpdateError } = require('@helpers/errors');

class CustomerValidation {
    static Validate(request, response, next) {
        try {
            switch (request.method) {
                case "POST":
                    CustomerValidation.ValidateCreate(request.body);
                    break;
                case "GET":
                    CustomerValidation.ValidateIdIsNaN(request.params.customerId);
                    break;
                case "PATCH":
                    CustomerValidation.ValidateUpdate(request);
                    break;
                case "DELETE":
                    CustomerValidation.ValidateIdIsNaN(request.params.customerId);
                    break;
            }
            next();
        } catch (error) {
            return response.status(error.code).json(error);
        }
    }

    static ValidateCreate(customerData) {
        CustomerValidation.ValidateAllFieldsUndefined(customerData);
        CustomerValidation.ValidateAllFieldsEmpty(customerData);
    }

    static ValidateAllFieldsUndefined(customerData) {
        if (!customerData.name
            || !customerData.email
            || !customerData.vatNumber
            || !customerData.delivery_street
            || !customerData.delivery_city
            || !customerData.delivery_country
            || !customerData.billing_street
            || !customerData.billing_city
            || !customerData.billing_country) {
                throw new RequestValidationError('One or more request fields are missing.');
        }
    }

    static ValidateAllFieldsEmpty(customerData) {
        if (!/\S/.test(customerData.name)
            || !/\S/.test(customerData.email)
            || !/\S/.test(customerData.vatNumber)
            || !/\S/.test(customerData.delivery_street)
            || !/\S/.test(customerData.delivery_city)
            || !/\S/.test(customerData.delivery_country)
            || !/\S/.test(customerData.billing_street)
            || !/\S/.test(customerData.billing_city)
            || !/\S/.test(customerData.billing_country)) {
                throw new RequestValidationError('One or more request fields are empty.');
        }
    }

    static ValidateIdIsNaN(id) {
        if (isNaN(id)) {
            throw new ArgumentIsNotIntError('Customer ID must be an integer. Given ID: ' + id);
        }
    }

    static ValidateUpdate(request) {
        CustomerValidation.ValidateIdIsNaN(request.params.customerId);

        const updatedCustomerData = request.body;

        if (!/\S/.test(updatedCustomerData.name)    
            || !/\S/.test(updatedCustomerData.email)
            || !/\S/.test(updatedCustomerData.vatNumber)
            || !/\S/.test(updatedCustomerData.delivery_street)
            || !/\S/.test(updatedCustomerData.delivery_city)
            || !/\S/.test(updatedCustomerData.delivery_country)
            || !/\S/.test(updatedCustomerData.billing_street)
            || !/\S/.test(updatedCustomerData.billing_city)
            || !/\S/.test(updatedCustomerData.billing_country)) {
            throw new UpdateError('One or more updated fields are empty.');
        }
    }

    static ValidateIdExists(id) {
        if (id === null || id === undefined) {
            throw new Error();
        }
    }
}

module.exports = {
    CustomerValidation
};