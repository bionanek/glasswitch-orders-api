const { 
    RequestValidationError,
    ArgumentIsIncorrectType } = require('@helpers/errors');

class PriceValidation {
    static Validate(priceObject) {
        this.priceObject = priceObject;

        this.CheckForUndefinedFields();
        this.CheckIfFieldsAreNumbers();
    }

    static CheckForUndefinedFields() {
        if (!this.priceObject ||
            !this.priceObject.pln ||
            !this.priceObject.eur ||
            !this.priceObject.usd) {
            throw new RequestValidationError('One or more request Price fields are missing.');
        }
    }

    static CheckIfFieldsAreNumbers() {
        if (isNaN(this.priceObject.pln) ||
            isNaN(this.priceObject.eur) ||
            isNaN(this.priceObject.usd)) {
                throw new ArgumentIsIncorrectType('One of given price currencies is not a number.')
            }
    }
}

module.exports = {
    PriceValidation
}