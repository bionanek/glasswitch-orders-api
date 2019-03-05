const assert = require('chai').assert;
const expect = require('chai').expect;

const { CustomerValidation } = require('../../helpers/validation/customerValidation');

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
        var createdCustomer = CustomerValidation.ValidateCreate(customerTestObject);
        assert.equal(customerTestObject, createdCustomer, 'WTF');

        //expected undefined to equal { Object (name, email, ...) }
        // expect(createdCustomer).to.equal(customerTestObject);

        //expected { Object (name, email, ...) } to equal undefined
        // expect(customerTestObject).to.equal(createdCustomer);

        // expect(CustomerValidation.ValidateCreate(customerTestObject)).to.be.true;
    });
});