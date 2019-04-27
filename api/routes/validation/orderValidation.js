const {
    RequestValidationError,
    ArgumentIsIncorrectType,
    UpdateError
} = require('@helpers/errors')

class OrderValidation {
    static Validate(request, response, next) {
        try {
            switch (request.method) {
                case "POST":
                    OrderValidation.ValidateCreate(request.body)
                    break
                case "GET":
                    OrderValidation.ValidateIdIsNaN(request.params.orderId)
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

    static ValidateCreate(orderData) {
        OrderValidation.ValidateAllFieldsUndefined(orderData)
        OrderValidation.ValidateAllFieldsEmpty(orderData)
    }

    static ValidateAllFieldsUndefined(orderData) {
        if (!orderData.currency
            || !orderData.email
            || !orderData.deadline
            || !orderData.customerId
            || orderData.confirmationSent === undefined
            || orderData.proformaSent     === undefined
            || orderData.invoiceSent      === undefined
            || orderData.settledPayment   === undefined) {
                throw new RequestValidationError('One or more request fields are missing.')
        }
    }

    static ValidateAllFieldsEmpty(orderData) {
        if (!/\S/.test(orderData.currency)
            || !/\S/.test(orderData.email)
            || !/\S/.test(orderData.deadline)) {
                throw new RequestValidationError('One or more request fields are empty.')
        }
    }

    static ValidateIdIsNaN(id) {
        if (isNaN(id)) {
            throw new ArgumentIsIncorrectType('Order ID must be an integer.')
        }
    }

    static ValidateUpdate(request) {
        OrderValidation.ValidateIdIsNaN(request.params.orderId)
        const updatedOrderData = request.body

        if (updatedOrderData.productsCount
            || updatedOrderData.productsTotalPrice) {
                throw new UpdateError('You cannot change products counter and total price manually.')
        }

        if (!/\S/.test(updatedOrderData.currency)
            || !/\S/.test(updatedOrderData.email)
            || !/\S/.test(updatedOrderData.deadline)) {
                throw new UpdateError('One or more request fields are empty.')
        }
    }

    static ValidateAddProducts(request, response, next) {
        const productsData = request.body

        if (!productsData.productId
            || !productsData.quantity) {
                throw new RequestValidationError('One or more request fields are missing.')
        }
        next()
    }
}

module.exports = {
    OrderValidation
}