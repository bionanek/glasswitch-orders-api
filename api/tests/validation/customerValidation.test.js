const expect = require('chai').expect;

const { CustomerValidation } = require('@validation/customerValidation');
const { Verificate } = require('@verify/verificate');

const { 
    RequestValidationError,
    ArgumentIsIncorrectType,
    IdNotFound,
    UpdateError
} = require('@helpers/errors');

describe('Customers: ValidateCreate', () => {
    it('Should pass creation of a customer.', () => {
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
        var bindCustomerCreate = CustomerValidation.ValidateCreate
                                    .bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate)
            .to.not.throw(RequestValidationError);
    });

    it('Should throw an error about missing field/s.', () => {
        var customerTestObject = {
            email: 'customer@email.com',
            phone: null,
            vatNumber: 'PL123123',
            delivery_country: 'Delivery Country',
            delivery_postCode: null,
            billing_country: 'Billing Country',
            billing_postCode: null
        };
        var bindCustomerCreate = CustomerValidation.ValidateUndefined
                                    .bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate)
            .to.throw(RequestValidationError)
            .to.has.property('message', 'One or more request fields are missing. Missing field: \'name\'.');
    });

    it('Should throw an error about empty field/s.', () => {
        var customerTestObject = {
            name: '',
            email: 'customer@email.com',
            phone: null,
            vatNumber: '',
            delivery_street: '',
            delivery_city: 'Delivery City',
            delivery_country: 'Delivery Country',
            delivery_postCode: null,
            billing_street: 'Billing Street',
            billing_city: 'Billing City',
            billing_country: 'Billing Country',
            billing_postCode: null
        };
        var bindCustomerCreate = CustomerValidation.ValidateEmpty
                                    .bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate)
            .to.throw(RequestValidationError)
            .to.has.property('message', 'One or more request fields are empty. Empty field: \'name\'.');
    });
});

describe('Customers: ValidateIsNaN', () => {
    it('Should pass that given ID is a number.', () => {
        var customerId = 1;

        var bindIdIsNaN = CustomerValidation.ValidateIdIsNaN
                            .bind(CustomerValidation, customerId);

        expect(bindIdIsNaN)
            .to.not.throw(ArgumentIsIncorrectType);
    });

    it('Should throw an error that given ID is not a number.', () => {
        var customerId = 'dupa';

        var bindIdIsNaN = CustomerValidation.ValidateIdIsNaN
                            .bind(CustomerValidation, customerId);

        expect(bindIdIsNaN)
            .to.throw(ArgumentIsIncorrectType)
            .to.has.property('message', 'Customer ID must be an integer.');
    });
});

describe('Customers: ValidateIdExists', () => {
    it('Should pass that given ID exists.', () => {
        var customerId = 1;

        var bindIdNotFound = Verificate.IdExists
                                .bind(CustomerValidation, customerId);

        expect(bindIdNotFound)
            .to.not.throw(IdNotFound);
    });

    it('Should pass that given ID doesn\'t exist.', () => {
        var customerId = null;

        var bindIdNotFound = Verificate.IdExists
                                .bind(CustomerValidation, customerId);

        expect(bindIdNotFound)
            .to.throw(IdNotFound)
            .to.has.property('message', 'Given ID doesn\'t exist.');
    });
});

describe('Customers: ValidateUpdate', () => {
    it('Should pass the update.', () => {
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
        var bindCustomerUpdate = CustomerValidation.ValidateUpdate
                                    .bind(CustomerValidation, customerTestObject);

        expect(bindCustomerUpdate)
            .to.not.throw(UpdateError);
    });

    it('Should throw an error about empty field/s.', () => {
        var customerTestObject = {
            name: ''
        };

        var request = {
            params: {
                customerId: 1
            },
            body: customerTestObject
        }

        var bindCustomerUpdate = CustomerValidation.ValidateUpdate
                                    .bind(CustomerValidation, request);

        expect(bindCustomerUpdate)
            .to.throw(UpdateError);
    });
});