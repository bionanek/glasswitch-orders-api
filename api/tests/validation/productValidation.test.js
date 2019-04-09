const expect = require('chai').expect;

const { ProductValidation } = require('@validation/productValidation');
const { Verification } = require('@verify/verification');

const { 
    RequestValidationError,
    ArgumentIsIncorrectType,
    IdNotFound,
    UpdateError } = require('@helpers/errors');

describe('Products: ValidateCreate', () => {
    it('Should pass creation of a product.', () => {
        var productTestObject = {
            name: 'Product',
            description: 'Description',
            type: 'Type',
            category: 'Category',
            width: 1.2,
            height: 1.2,
            depth: 1.2,
            image: 'ImagePath',
            price: {
                pln: 3.0,
                eur: 3.0,
                usd: 3.0
            }
        };
        var bindProductCreate = ProductValidation.ValidateCreate
                                    .bind(ProductValidation, productTestObject);

        expect(bindProductCreate)
            .to.not.throw(RequestValidationError);
    });

    it('Should throw an error about missing field/s.', () => {
        var productTestObject = {
            width: 1.2,
            height: 1.2,
            depth: 1.2,
            image: 'ImagePath',
            price: {
                pln: 3.0,
                eur: 3.0,
                usd: 3.0
            }
        };
        var bindProductCreate = ProductValidation.ValidateAllFieldsUndefined
                                    .bind(ProductValidation, productTestObject);

        expect(bindProductCreate)
            .to.throw(RequestValidationError)
            .to.has.property('message', 'One or more request fields are missing.');
    });

    it('Should throw an error about empty field/s.', () => {
        var productTestObject = {
            name: '',
            description: '',
            type: '',
            category: 'Category',
            width: 1.2,
            height: 1.2,
            depth: 1.2,
            image: 'ImagePath',
            price: {
                pln: 3.0,
                eur: 3.0,
                usd: 3.0
            }
        };
        var bindProductCreate = ProductValidation.ValidateAllFieldsEmpty
                                    .bind(ProductValidation, productTestObject);

        expect(bindProductCreate)
            .to.throw(RequestValidationError)
            .to.has.property('message', 'One or more request fields are empty.');
    });
});

describe('Products: ValidateIsNaN', () => {
    it('Should pass that given ID is a number.', () => {
        var productId = 1;

        var bindIdIsNaN = ProductValidation.ValidateIdIsNaN
                            .bind(ProductValidation, productId);

        expect(bindIdIsNaN)
            .to.not.throw(ArgumentIsIncorrectType);
    });

    it('Should throw an error that given ID is not a number.', () => {
        var productId = 'dupa';

        var bindIdIsNaN = ProductValidation.ValidateIdIsNaN
                            .bind(ProductValidation, productId);

        expect(bindIdIsNaN)
            .to.throw(ArgumentIsIncorrectType)
            .to.has.property('message', 'Product ID must be an integer.');
    });
});

describe('Products: ValidateIdExists', () => {
    it('Should pass that given ID exists.', () => {
        var productId = 1;

        var bindIdNotFound = Verification.IdExists
                                .bind(Verification, productId);

        expect(bindIdNotFound)
            .to.not.throw(IdNotFound);
    });

    it('Should pass that given ID doesn\'t exist.', () => {
        var productId = null;

        var bindIdNotFound = Verification.IdExists
                                .bind(Verification, productId);

        expect(bindIdNotFound)
            .to.throw(IdNotFound)
            .to.has.property('message', 'Given ID doesn\'t exist.');
    });
});

describe('Products: ValidateSearchQuery', () => {
    it('Should throw error when query parameter has wrong name', () => {
        const badSearchRequest = {
            query: {
                parameter: "search query"
            }
        };

        const bindValidateSearchQuery = ProductValidation.ValidateSearchQuery.bind(ProductValidation, badSearchRequest);
        
        expect(bindValidateSearchQuery)
            .to.throw(RequestValidationError)
            .to.has.property('message', 
                'Search query is missing \'search\' field. Correct query should looke like this: \'/products/search?search=yourRequestedSearchPhrase\'');
    });

    it('Should pass validation with correct request query', () => {
        const searchRequest = {
                search: "search query"
        };   

        const bindValidateSearchQuery = ProductValidation.ValidateSearchQuery.bind(ProductValidation, searchRequest); 
        expect(bindValidateSearchQuery)
            .to.not.throw(RequestValidationError);
    })
});

describe('Products: ValidateUpdate', () => {
    it('Should pass the update.', () => {
        var productTestObject = {
            name: 'Product',
            description: 'Description',
            type: 'Type',
            category: 'Category',
            width: 1.2,
            height: 1.2,
            depth: 1.2,
            image: 'ImagePath',
            price: {
                pln: 3.0,
                eur: 3.0,
                usd: 3.0
            }
        };
        var bindProductUpdate = ProductValidation.ValidateUpdate
                                    .bind(ProductValidation, productTestObject);

        expect(bindProductUpdate)
            .to.not.throw(UpdateError);
    });

    it('Should throw an error about empty field/s.', () => {
        var productTestObject = {
            name: '',
            description: '',
            type: 'Type',
            category: 'Category',
            width: 1.2,
            height: 1.2,
            depth: 1.2,
            image: 'ImagePath',
            price: {
                pln: 3.0,
                eur: 3.0,
                usd: 3.0
            }
        };

        var request = {
            params: {
                productId: 1
            },
            body: productTestObject
        }

        var bindProductUpdate = ProductValidation.ValidateUpdate
                                    .bind(ProductValidation, request);

        expect(bindProductUpdate)
            .to.throw(UpdateError);
    });
});