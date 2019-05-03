const { Customers } = require('@db/dbHelper')
const { Sequelize } = require('@db/dbHelper')

const Op = Sequelize.Op
exports.Customers = Customers

exports.createCustomer = (customerData) => {
    return Customers.create(customerData)
}

exports.updateCustomer = (customerId, updatedCustomerData) => {
    return Customers.update(updatedCustomerData, 
        { where: { id: customerId } })
}

exports.deleteCustomer = (customerId) => {
    return Customers.destroy(
        { where: { id: customerId }, cascade: true })
}

exports.getAll = () => {
    return Customers.findAll()
}

exports.getById = (customerId) => {
    return Customers.findById(customerId)
}

exports.getSearchResults = async (searchPhrase) => {
    const likeOperator = { [Op.like]: `%${searchPhrase}%`}

    const searchResults = await Customers.findAll({
        where: {
            [Op.or]: [
                { name: likeOperator },
                { email: likeOperator },
                { phone: likeOperator },
                { vatNumber: likeOperator },
                { delivery_street: likeOperator },
                { delivery_city: likeOperator },
                { delivery_country: likeOperator },
                { delivery_postCode: likeOperator },
                { billing_street: likeOperator },
                { billing_city: likeOperator },
                { billing_country: likeOperator },
                { billing_postCode: likeOperator }
            ]
        }
    })

    return searchResults
}
