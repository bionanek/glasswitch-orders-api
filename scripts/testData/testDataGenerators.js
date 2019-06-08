const utils = require("./utils");

function getName() {
	return utils.strRandom() + " " + utils.strRandom();
}

exports.customerMaker = function*(count) {
	for (let i = 1; i <= count; i++) {
		let customer = {
			name: getName() + " " + i,
			email: utils.strRandom() + "@mail.com",
			phone: null,
			vatNumber: "PL123123123",
			delivery_street: utils.strRandom() + " Street",
			delivery_city: utils.strRandom() + " City",
			delivery_country: utils.strRandom() + " Country",
			delivery_postCode: null,
			billing_street: utils.strRandom() + " Street",
			billing_city: utils.strRandom() + " City",
			billing_country: utils.strRandom() + " Country",
			billing_postCode: null
		};

		yield customer;
	}
};

exports.productsMaker = function*(count) {
	for (let i = 1; i <= count; i++) {
		let product = {
			name: "Prod " + getName() + " " + i,
			code: `GW-${utils.intRandom(0, 500)}-${utils.intRandom(0, 500)}`,
			description: "Description " + utils.lorem,
			type: getName(),
			category: getName(),
			width: utils.decRandom(1, 20),
			height: utils.decRandom(1, 20),
			depth: utils.decRandom(1, 20),
			imageUrl:
				"https://shortyawards.imgix.net/entries/9th/7fc62abf-4e67-43f7-899e-629a87716d07.jpg?auto=format&fit=crop&h=400&q=65&w=400&s=9e4bd27c80965abbffb6a78c2ff93f52",
			price: {
				pln: utils.decRandom(1, 20),
				eur: utils.decRandom(1, 20),
				usd: utils.decRandom(1, 20)
			}
		};

		yield product;
	}
};

const currencies = ["usd", "eur", "pln"];

exports.ordersMaker = function*(count, productsRange, customersRange) {
	for (let i = 1; i <= count; i++) {
		let products = [];

		for (let j = 0; j < utils.intRandom(1, 25); j++) {
			products.push({
				id: utils.intRandom(1, productsRange),
				quantity: utils.intRandom(1, 1000)
			});
		}

		let order = {
			shippingCost: utils.decRandom(1, 200),
			shippingCompany: utils.strRandom() + " Shipping Company",
			currency: currencies[utils.intRandom(0, 2)],
			notes: "Some Notes " + utils.lorem,
			email: utils.strRandom() + "@mail.com",
			confirmationSent: count % utils.intRandom(1, 10) === 0,
			proformaSent: count % utils.intRandom(1, 10) > utils.intRandom(0, 10),
			invoiceSent: count % utils.intRandom(1, 10) > utils.intRandom(0, 10),
			settledPayment: count % utils.intRandom(1, 10) > utils.intRandom(0, 10),
			deadline: utils.dateRandom(),
			customerId: utils.intRandom(1, customersRange),
			wantedProducts: products
		};

		yield order;
	}
};
