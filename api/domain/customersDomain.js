const customerRepo = require("@repos/customerRepository")
const { Verification, Resources } = require("@verify/verification")
const { IdNotFound, SequelizeError } = require("@helpers/errors")

exports.create = customerData => {
	try {
		return customerRepo.createCustomer(customerData)
	} catch (error) {
		throw new Error(error)
	}
}

exports.update = async (customerId, updatedCustomerData) => {
	try {
		await Verification.IdExists(Resources.Customers, customerId)

		return customerRepo.updateCustomer(customerId, updatedCustomerData)
	} catch (error) {
		if (error.name.includes("Sequelize")) {
			throw new SequelizeError("Field cannot be null.")
		}
		throw new IdNotFound(error.message + " && No customer was updated.")
	}
}

exports.delete = async customerId => {
	try {
		await Verification.IdExists(Resources.Customers, customerId)

		return customerRepo.deleteCustomer(customerId)
	} catch (error) {
		throw new IdNotFound(error.message + " && No customer was deleted.")
	}
}

exports.getAll = () => {
	try {
		return customerRepo.getAll()
	} catch (error) {
		throw new Error("No customers were found.")
	}
}

exports.getById = async customerId => {
	try {
		await Verification.IdExists(Resources.Customers, customerId)

		return customerRepo.getById(customerId)
	} catch (error) {
		throw new IdNotFound(error.message)
	}
}

exports.getSearchResults = searchPhrase => {
	return customerRepo.getSearchResults(searchPhrase)
}
