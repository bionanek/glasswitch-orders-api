const { 
    RequestValidationError,
    ArgumentIsIncorrectType,
    UpdateError } = require('@helpers/errors');

const { PriceValidation } = require('@validation/priceValidation');

class ProductValidation {
    static Validate(request, response, next) {
        try {
            switch (request.method) {
                case "POST": 
                    ProductValidation.ValidateCreate(request.body);
                    break;
                case "GET":
                    ProductValidation.ValidateGet(request);
                    break;
                case "PATCH":
                    ProductValidation.ValidateUpdate(request);
                    break;
                case "DELETE":
                    ProductValidation.ValidateId(request.params.productId);
                    break;
            }   
            next();
        } catch (error) {
            return response.status(error.code).json(error);
        }
    }

    static ValidateGet(request) {
        if (request.query) {
            ProductValidation.ValidateSearchQuery(request.query);
        }

        if (request.params.productId) {
            ProductValidation.ValidateIdIsNaN(request.params.productId);
        }
    }

    static ValidateSearchQuery(query) {
        if (!query.search) {
            throw new RequestValidationError('Search query is missing \'search\' field. Correct query should looke like this: \'/products/search?search=yourRequestedSearchPhrase\'');
        }
    }

    static ValidateCreate(productData) {
        ProductValidation.ValidateAllFieldsUndefined(productData);
        ProductValidation.ValidateAllFieldsEmpty(productData);
        PriceValidation.Validate(productData.price);
    }

    static ValidateAllFieldsUndefined(productData) {
        if (!productData.name
            || !productData.type
            || !productData.category
            || !productData.image
            || !productData.price) {
                throw new RequestValidationError('One or more request fields are missing.');
            }
    }

    static ValidateAllFieldsEmpty(productData) {
        if (!/\S/.test(productData.name)
            || !/\S/.test(productData.description)
            || !/\S/.test(productData.type)
            || !/\S/.test(productData.category)
            || !/\S/.test(productData.width)
            || !/\S/.test(productData.height)
            || !/\S/.test(productData.depth)
            || !/\S/.test(productData.image)
            || !/\S/.test(productData.price)) {
                throw new RequestValidationError('One or more request fields are empty.');
            }
    }

    static ValidateIdIsNaN(id) {
        if (isNaN(id)) {
            throw new ArgumentIsIncorrectType('Product ID must be an integer.');
        }
    }

    static ValidateUpdate(request) {
        ProductValidation.ValidateIdIsNaN(request.params.productId);

        const updatedProductData = request.body;

        if (updatedProductData.price) {
            PriceValidation.Validate(updatedProductData.price);
        }

        if (!/\S/.test(updatedProductData.name)
            || !/\S/.test(updatedProductData.description)
            || !/\S/.test(updatedProductData.type)
            || !/\S/.test(updatedProductData.category)
            || !/\S/.test(updatedProductData.width)
            || !/\S/.test(updatedProductData.height)
            || !/\S/.test(updatedProductData.depth)
            || !/\S/.test(updatedProductData.image)) {
                throw new UpdateError('One or more updated fields are empty.');
            }
    }
}

module.exports = {
    ProductValidation
}