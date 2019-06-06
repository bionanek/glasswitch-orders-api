const fetch = require("node-fetch");
const testDataGen = require("./testDataGenerators");
const apiUrl = "http://localhost:3001/";

let customerGen = testDataGen.customerMaker(100);
for (let customer of customerGen) {
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
		});
}
console.log("Customers for loop done.");

let productGen = testDataGen.productsMaker(300);
console.log("Declared productgen");
for (let product of productGen) {
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
		});
}
console.log("Products for loop done.");
