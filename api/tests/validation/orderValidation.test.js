const expect = require("chai").expect

const { OrderValidation } = require("@validation/orderValidation")
const { Verificate } = require("@verify/verificate")

const {
	RequestValidationError,
	ArgumentIsIncorrectType,
	IdNotFound,
	UpdateError
} = require("@helpers/errors")

describe("Orders: ValidateCreate", () => {
	it("Should pass creation of an order.", () => {
		var orderTestObject = {
			productsCount: 1,
			shippingCost: null,
			shippingCompany: null,
			productsTotalPrice: 1,
			currency: "usd",
			notes: null,
			email: "email",
			confirmationSent: false,
			proformaSent: false,
			invoiceSent: false,
			settledPayment: false,
			deadline: "12.10.2021"
		}
		var bindOrderCreate = OrderValidation.ValidateCreate.bind(
			OrderValidation,
			orderTestObject
		)

		expect(bindOrderCreate).to.not.throw(RequestValidationError)
	})

	it("Should throw an error about missing field/s.", () => {
		var orderTestObject = {
			productsCount: 1,
			shippingCost: null,
			shippingCompany: null,
			notes: null,
			confirmationSent: false,
			proformaSent: false,
			invoiceSent: false,
			settledPayment: false,
			deadline: "12.10.2021"
		}
		var bindOrderCreate = OrderValidation.ValidateAllFieldsUndefined.bind(
			OrderValidation,
			orderTestObject
		)

		expect(bindOrderCreate)
			.to.throw(RequestValidationError)
			.to.has.property("message", "One or more request fields are missing.")
	})

	it("Should throw an error about empty field/s.", () => {
		var orderTestObject = {
			productsCount: 1,
			shippingCost: null,
			shippingCompany: null,
			productsTotalPrice: 1,
			currency: "",
			notes: null,
			email: "",
			confirmationSent: false,
			proformaSent: false,
			invoiceSent: false,
			settledPayment: false,
			deadline: "12.10.2021"
		}
		var bindOrderCreate = OrderValidation.ValidateAllFieldsEmpty.bind(
			OrderValidation,
			orderTestObject
		)

		expect(bindOrderCreate)
			.to.throw(RequestValidationError)
			.to.has.property("message", "One or more request fields are empty.")
	})
})

describe("Orders: ValidateIsNaN", () => {
	it("Should pass that given ID is a number.", () => {
		var orderId = 1

		var bindIdIsNaN = OrderValidation.ValidateIdIsNaN.bind(
			OrderValidation,
			orderId
		)

		expect(bindIdIsNaN).to.not.throw(ArgumentIsIncorrectType)
	})

	it("Should throw an error that given ID is not a number.", () => {
		var orderId = "dupa"

		var bindIdIsNaN = OrderValidation.ValidateIdIsNaN.bind(
			OrderValidation,
			orderId
		)

		expect(bindIdIsNaN)
			.to.throw(ArgumentIsIncorrectType)
			.to.has.property("message", "Order ID must be an integer.")
	})
})

describe("Orders: ValidateIdExists", () => {
	it("Should pass that given ID exists.", () => {
		var orderId = 1

		var bindIdNotFound = Verificate.IdExists.bind(OrderValidation, orderId)

		expect(bindIdNotFound).to.not.throw(IdNotFound)
	})

	it("Should throw an error that given ID doesn't exist.", () => {
		var orderId = null

		var bindIdNotFound = Verificate.IdExists.bind(Verificate, orderId)

		expect(bindIdNotFound)
			.to.throw(IdNotFound)
			.to.has.property("message", "Given ID doesn't exist.")
	})
})

describe("Orders: ValidateUpdate", () => {
	it("Should pass the update.", () => {
		var orderTestObject = {
			productsCount: 1,
			shippingCost: null,
			shippingCompany: null,
			productsTotalPrice: 1,
			currency: "usd",
			notes: null,
			email: "email",
			confirmationSent: false,
			proformaSent: false,
			invoiceSent: false,
			settledPayment: false,
			deadline: "12.10.2021"
		}
		var bindOrderUpdate = OrderValidation.ValidateUpdate.bind(
			OrderValidation,
			orderTestObject
		)

		expect(bindOrderUpdate).to.not.throw(UpdateError)
	})

	it("Should throw an error about empty field/s.", () => {
		var orderTestObject = {
			productsCount: 1,
			shippingCost: null,
			shippingCompany: null,
			productsTotalPrice: 1,
			currency: "",
			notes: null,
			email: "",
			confirmationSent: false,
			proformaSent: false,
			invoiceSent: false,
			settledPayment: false,
			deadline: "12.10.2021"
		}

		var request = {
			params: {
				orderId: 1
			},
			body: orderTestObject
		}

		var bindOrderUpdate = OrderValidation.ValidateUpdate.bind(
			OrderValidation,
			request
		)

		expect(bindOrderUpdate).to.throw(UpdateError)
	})
})
