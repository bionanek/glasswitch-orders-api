const {
	RequestValidationError,
	ArgumentIsIncorrectType,
	UpdateError
} = require("@helpers/errors");
const { productDataModel } = require("@models/productDataModel");
const { PriceValidation } = require("@validation/priceValidation");
const ProductsQueries = require("./models/QueryModels").ProductsQueries;
const { URLQueryValidation } = require("./utils/urlQueryValidation");

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
					ProductValidation.ValidateIdIsNaN(request.params.productId);
					break;
			}
			next();
		} catch (error) {
			return response.status(error.code).json(error);
		}
	}

	static ValidateGet(request) {
		switch (request.path) {
			case "/by/price":
				ProductValidation.ValidatePriceRangeQuery(request.query);
				break;
			case "/search":
				ProductValidation.ValidateSearchQuery(request.query);
				break;
			default:
				if (request.params.productId) {
					ProductValidation.ValidateIdIsNaN(request.params.productId);
				}
		}
	}

	static ValidatePriceRangeQuery(query) {
		URLQueryValidation.Validate(query, ProductsQueries.ByPriceRangeQueryModel);
	}

	static ValidateSearchQuery(query) {
		if (!query.search) {
			throw new RequestValidationError(
				"Search query is missing 'search' field. Correct query should looke like this: '/products/search?search=yourRequestedSearchPhrase'"
			);
		}
	}

	static ValidateCreate(productData) {
		ProductValidation.ValidateUndefined(productData);
		ProductValidation.ValidateEmpty(productData);
		PriceValidation.Validate(productData.price);
	}

	static ValidateUndefined(productData) {
		ProductValidation.ValidateNotNullFields(
			productData,
			(testedValue, badFieldName) => {
				if (testedValue === undefined) {
					throw new RequestValidationError(
						`One or more request fields are missing. Missing field: '${badFieldName}'.`
					);
				}
			}
		);
	}

	static ValidateEmpty(productData, requestMethod = null) {
		ProductValidation.ValidateNotNullFields(
			productData,
			(testedValue, badFieldName) => {
				if (!/\S/.test(testedValue)) {
					const errorMsg = `One or more request fields are empty. Empty field: '${badFieldName}'.`;

					if (requestMethod === null) {
						throw new RequestValidationError(errorMsg);
					} else if (requestMethod === "PATCH") {
						throw new UpdateError(errorMsg);
					}
				}
			}
		);
	}

	static ValidateNotNullFields(data, callback) {
		for (var objectProperty in productDataModel) {
			const testedFieldObject = productDataModel[objectProperty];

			if (
				testedFieldObject.allowNull != undefined &&
				testedFieldObject.allowNull === false
			) {
				callback(data[objectProperty], objectProperty.toString());
			}
		}
	}

	static ValidateIdIsNaN(id) {
		if (isNaN(id)) {
			throw new ArgumentIsIncorrectType("Product ID must be an integer.");
		}
	}

	static ValidateUpdate(request) {
		ProductValidation.ValidateIdIsNaN(request.params.productId);
		ProductValidation.ValidateEmpty(request.body, "PATCH");
	}
}

module.exports = {
	ProductValidation
};
