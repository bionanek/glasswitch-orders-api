const {
	RequestValidationError,
	ArgumentIsIncorrectType,
	UpdateError
} = require("@helpers/errors")

class OrderValidation {
	static Validate(request, response, next) {
		try {
			switch (request.method) {
				case "POST":
					OrderValidation.ValidateCreate(request.body)
					break
				case "GET":
					OrderValidation.ValidateGet(request)
					break
				case "PATCH":
					OrderValidation.ValidateUpdate(request)
					break
				case "DELETE":
					OrderValidation.ValidateIdIsNaN(request.params.orderId)
					break
			}
			next()
		} catch (error) {
			return response.status(error.code).json(error)
		}
	}

	static ValidateGet(request) {
		switch (request.path) {
			case "/search":
				OrderValidation.ValidateSearchQuery(request.query)
				break
			default:
				if (request.params.orderId)
					OrderValidation.ValidateIdIsNaN(request.params.orderId)
		}
	}

	static ValidateSearchQuery(query) {
		if (!query.search) {
			throw new RequestValidationError(
				"Search query is missing 'search' field. Correct query should looke like this: '/orders/search?search=yourRequestedSearchPhrase'"
			)
		}
	}

	static ValidateCreate(orderData) {
		OrderValidation.ValidateAllFieldsUndefined(orderData)
		OrderValidation.ValidateAllFieldsEmpty(orderData)
	}

	static ValidateAllFieldsUndefined(orderData) {
		if (
			!orderData.currency ||
			!orderData.email ||
			!orderData.deadline ||
			!orderData.customerId ||
			orderData.confirmationSent === undefined ||
			orderData.proformaSent === undefined ||
			orderData.invoiceSent === undefined ||
			orderData.settledPayment === undefined
		) {
			throw new RequestValidationError(
				"One or more request fields are missing."
			)
		}
	}

	static ValidateAllFieldsEmpty(orderData) {
		if (
			!/\S/.test(orderData.currency) ||
			!/\S/.test(orderData.email) ||
			!/\S/.test(orderData.deadline)
		) {
			throw new RequestValidationError("One or more request fields are empty.")
		}
	}

	static ValidateIdIsNaN(id) {
		if (isNaN(id)) {
			throw new ArgumentIsIncorrectType("Order ID must be an integer.")
		}
	}

	static ValidateUpdate(request) {
		OrderValidation.ValidateIdIsNaN(request.params.orderId)
		const updatedOrderData = request.body

		if (
			updatedOrderData.productsCount ||
			updatedOrderData.productsTotalPrice ||
			updatedOrderData.customerId
		) {
			throw new UpdateError(
				"You cannot change three props manually! These are customerId, productsCount & productsTotalPrice."
			)
		}

		if (
			!/\S/.test(updatedOrderData.currency) ||
			!/\S/.test(updatedOrderData.email) ||
			!/\S/.test(updatedOrderData.deadline)
		) {
			throw new UpdateError("One or more request fields are empty.")
		}
	}
}

module.exports = {
	OrderValidation
}
