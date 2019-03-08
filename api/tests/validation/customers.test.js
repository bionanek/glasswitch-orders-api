const expect = require('chai').expect;

const { CustomerValidation } = require('../../helpers/validation/customerValidation');
const { RequestValidationError } = require('../../helpers/errors');
const { ArgumentIsIncorrectType } = require('../../helpers/errors');
const { IdNotFound } = require('../../helpers/errors');
const { UpdateError } = require('../../helpers/errors');

describe('ValidateCreate', () => {
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
        var bindCustomerCreate = CustomerValidation.ValidateCreate.bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate).to.not.throw(RequestValidationError);
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
        var bindCustomerCreate = CustomerValidation.ValidateAllFieldsUndefined.bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate).to.throw(RequestValidationError).to.has.property('message', 'One or more request fields are missing.');
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
        var bindCustomerCreate = CustomerValidation.ValidateAllFieldsEmpty.bind(CustomerValidation, customerTestObject);

        expect(bindCustomerCreate).to.throw(RequestValidationError).to.has.property('message', 'One or more request fields are empty.');
    });
});

describe('ValidateIsNaN', () => {
    it('Should pass that given ID is a number.', () => {
        var customerId = 1;

        var bindIdIsNaN = CustomerValidation.ValidateIdIsNaN.bind(CustomerValidation, customerId);

        expect(bindIdIsNaN).to.not.throw(ArgumentIsIncorrectType);
    });

    it('Should throw an error that given ID is not a number.', () => {
        var customerId = 'dupa';

        var bindIdIsNaN = CustomerValidation.ValidateIdIsNaN.bind(CustomerValidation, customerId);

        expect(bindIdIsNaN).to.throw(ArgumentIsIncorrectType).to.has.property('message', 'Customer ID must be an integer.');
    });
});

describe('ValidateIdExists', () => {
    it('Should pass that given ID exists.', () => {
        var customerId = 1;

        var bindIdNotFound = CustomerValidation.ValidateIdExists.bind(CustomerValidation, customerId);

        expect(bindIdNotFound).to.not.throw(IdNotFound);
    });

    it('Should pass that given ID doesn\'t exist.', () => {
        var customerId = null;

        var bindIdNotFound = CustomerValidation.ValidateIdExists.bind(CustomerValidation, customerId);

        expect(bindIdNotFound).to.throw(IdNotFound).to.has.property('message', 'Customer with given ID doesn\'t exist.');
    });
});

describe('ValidateUpdate', () => {
    it('Should pass an update.', () => {
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
        var bindCustomerUpdate = CustomerValidation.ValidateUpdate.bind(CustomerValidation, customerTestObject);

        expect(bindCustomerUpdate).to.not.throw(UpdateError);
    });

    // -TypeError: Cannot read property 'customerId' of undefined
    it('Should throw an error about empty field/s.', () => {
        var customerTestObject = {
            customerId: 1,
            name: ''
        };
        var bindCustomerUpdate = CustomerValidation.ValidateUpdate.bind(CustomerValidation, customerTestObject);

        expect(bindCustomerUpdate).to.throw(UpdateError);
    });
});