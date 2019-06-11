const fetch = require("node-fetch");
const testDataGen = require("./testDataGenerators");
const apiUrl = "http://localhost:3001/";
const headers = {
	Accept: "application/json",
	"Content-Type": "application/json"
};

let numberOfItems = 300;
let promises = [];

if (process.argv[2] !== undefined) {
	numberOfItems = +process.argv[2];
}

populateDB();

function populateDB() {
	populateCustomers();
	populateProducts();

	Promise.all(promises).then(() => populateOrders());
}

function populateOrders() {
	let orderGen = testDataGen.ordersMaker(
		numberOfItems,
		numberOfItems,
		numberOfItems
	);
	let counter = 0;

	for (let order of orderGen) {
		fetch(apiUrl + "orders", {
			method: "post",
			headers: headers,
			body: JSON.stringify(order)
		})
			.then(response => {
				console.log("Added Order: " + counter);
				counter++;
			})
			.catch(error => {
				console.log("There was an error when populating orders.");
				console.log(error);
			});
	}
}

function populateProducts() {
	let productGen = testDataGen.productsMaker(numberOfItems);
	for (let product of productGen) {
		promises.push(
			fetch(apiUrl + "products", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(product)
			})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log("Added product: " + data.code + ": " + data.name);
				})
				.catch(error => {
					console.log("There was an error when populating products.");
					console.log(error);
				})
		);
	}
}

function populateCustomers() {
	let customerGen = testDataGen.customerMaker(numberOfItems);
	for (let customer of customerGen) {
		promises.push(
			fetch(apiUrl + "customers", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(customer)
			})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log("Added customer: " + data.name);
				})
				.catch(error => {
					console.log("There was an error when populating customers.");
					console.log(error);
				})
		);
	}
}
