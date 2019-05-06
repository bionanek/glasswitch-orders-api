const config = require('config')
const Sequelize = require('sequelize')

var PricesDataModel = require('@models/priceDataModel').priceDataModel
var ProductsDataModel = require('@models/productDataModel').productDataModel
var CustomersDataModel = require('@models/customerDataModel').customerDataModel
var OrdersDataModel = require('@models/orderDataModel').orderDataModel

let sequelize

function getSequelize() {
    if (sequelize) {
        return sequelize
    }
    
    const options = config.dbOptions
    return new Sequelize(options)
}

sequelize = getSequelize()

var Products = sequelize.define('product', ProductsDataModel, { freezeTableName: true })
var Prices = sequelize.define('price', PricesDataModel, { freezeTableName: true })
var Customers = sequelize.define('customer', CustomersDataModel, { freezeTableName: true })
var Orders = sequelize.define('order', OrdersDataModel, { freezeTableName: true })
var ProductsOrders = sequelize.define('products_orders', { quantity: Sequelize.INTEGER })

Products.Price = Products.belongsTo(Prices, { onDelete: 'cascade' })
Orders.Customer = Orders.belongsTo(Customers, { onDelete: 'cascade' })
Customers.Order = Customers.hasMany(Orders, { as: 'orders' })

Orders.belongsToMany(Products, { as: 'products', through: ProductsOrders, foreignKey: 'orderId' })
Products.belongsToMany(Orders, { as: 'orders', through: ProductsOrders, foreignKey: 'productId' })

sequelize.sync({ force: true })

exports.Prices = Prices
exports.Products = Products
exports.Customers = Customers
exports.Orders = Orders
exports.ProductsOrders = ProductsOrders

exports.Sequelize = sequelize