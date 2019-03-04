const assert = require('chai').assert;

const customerValidation = require('../../helpers/validation/customerValidation');

describe('ValidateCreate', () => {
    it('Should pass creation of a customer', () => {

        var customerTestObject = {
            name: 'Customer',
            email: 'customer@email.com',
            phone: null,
            vatNumber: 'PL123123',
            delivery_street: 'Delivery Street',
            delivery_city: 'Delivery City',
            delivery_country: 'Delivery Country',
            delivery_postCode: null,
            billing_street: 'Billing Street',
            billing_city: 'Billing City',
            billing_country: 'Billing Country',
            billing_postCode: null
        };

        let result = customerValidation.ValidateCreate(customerTestObject);

        assert.equal(result, customerTestObject);
    });
});