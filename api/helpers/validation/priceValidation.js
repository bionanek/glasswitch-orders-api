const { RequestValidationError } = require('@helpers/errors');

class PriceValidation {
    static Validate(priceObject) {
        this.priceObject = priceObject;

        this.CheckForUndefinedFields();
    }

    static CheckForUndefinedFields() {
        if (!this.priceObject ||
            !this.priceObject.pln ||
            !this.priceObject.eur ||
            !this.priceObject.usd) {
                throw new RequestValidationError('One or more request Price fields are missing.');
            }
    }
}

module.exports = {
    PriceValidation
}