const Orders = require("@db/dbHelper").Orders
const Sequelize = require("@db/dbHelper").Sequelize

const Op = Sequelize.Op
exports.Orders = Orders

exports.createOrder = orderData => {
	return Orders.create(orderData, { include: [{ all: true }] })
}

exports.updateOrder = (orderId, updatedOrderData) => {
	return Orders.update(updatedOrderData, { where: { id: orderId } })
}

exports.deleteOrder = orderId => {
	return Orders.destroy({ where: { id: orderId }, cascade: true })
}

exports.getAll = () => {
	return Orders.findAll({ include: [{ all: true }] }).map(el =>
		el.get({ plain: true })
	)
}

exports.getById = orderId => {
	return Orders.findById(orderId, { include: [{ all: true }] })
}

exports.getSearchResults = async searchPhrase => {
	const likeOperator = { [Op.like]: `%${searchPhrase}%` }

	const searchResults = await Orders.findAll({
		where: {
			[Op.or]: [
				{ shippingCompany: likeOperator },
				{ currency: likeOperator },
				{ notes: likeOperator },
				{ email: likeOperator }
			]
		}
	})
	return searchResults
}

exports.addProducts = (order, productId, quantity) => {
	return order.addProducts(productId, { through: { quantity: quantity } })
}

exports.deleteProducts = (order, productId) => {
	return order.removeProducts(productId)
}
