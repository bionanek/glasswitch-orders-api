const { 
    RequestValidationError,
    ArgumentIsIncorrectType,
    UpdateError } = require('@helpers/errors');
const { customerDataModel } = require('@models/customerDataModel');

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
        CustomerValidation.ValidateUndefined(customerData);
        CustomerValidation.ValidateEmpty(customerData);
    }

    static ValidateUndefined(customerData) {
        this.ValidateNotNullFields(customerData, (testedValue, badFieldName) => {
            if(testedValue === undefined) {
                throw new RequestValidationError(`One or more request fields are missing. Missing field: '${badFieldName}'.`);
            }
        })
    }

    static ValidateEmpty(customerData, requestMethod = null) {
        this.ValidateNotNullFields(customerData, (testedValue, badFieldName) => {
            if(!/\S/.test(testedValue)) {
                const errorMsg = `One or more request fields are empty. Empty field: '${badFieldName}'.`;

                if (requestMethod === null) {
                    throw new RequestValidationError(errorMsg);
                } else if (requestMethod === "PATCH") {
                    throw new UpdateError(errorMsg);
                }
            }
        })
    }

    static ValidateNotNullFields(data, callback) {
        for (var objectProperty in customerDataModel) {
            const testedFieldObject = customerDataModel[objectProperty];
            
            if (testedFieldObject.allowNull != undefined 
                && testedFieldObject.allowNull === false) {
                    callback(data[objectProperty], objectProperty.toString());
            }
        }
    }

    static ValidateIdIsNaN(id) {
        if (isNaN(id)) {
            throw new ArgumentIsIncorrectType('Customer ID must be an integer.');
        }
    }

    static ValidateUpdate(request) {
        CustomerValidation.ValidateIdIsNaN(request.params.customerId);
        this.ValidateEmpty(request.body, "PATCH");
    }
}

module.exports = {
    CustomerValidation
};