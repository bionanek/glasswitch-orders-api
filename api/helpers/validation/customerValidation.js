const { RequestValidationError } = require('@helpers/errors');

class CustomerValidation {
    static SensownaNazwa(customerData) {
        if (!customerData.name || !/\S/.test(customerData.name)) {
            throw new RequestValidationError('Name can\'t be empy');
        }
    }
}

module.exports = {
    CustomerValidation,
};