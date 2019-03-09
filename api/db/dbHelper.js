const config = require('config');
const Sequelize = require('sequelize');
var PricesDataModel = require('@models/priceDataModel').priceDataModel;
var ProductsDataModel = require('@models/productDataModel').productDataModel;
var CustomersDataModel = require('@models/customerDataModel').customerDataModel;
var OrdersDataModel = require('@models/orderDataModel').orderDataModel;

let sequelize;

function getSequelize() {
    if (sequelize) {
        return sequelize;
    }

    const options = config.dbOptions;

    return new Sequelize(options);
}

sequelize = getSequelize();

var Products = sequelize.define('product', ProductsDataModel, {freezeTableName: true});
var Prices = sequelize.define('price', PricesDataModel, {freezeTableName: true})
var Customers = sequelize.define('customer', CustomersDataModel, {freezeTableName: true});
var Orders = sequelize.define('order', OrdersDataModel, {freezeTableName: true});

Products.Price = Products.belongsTo(Prices, { onDelete: 'cascade' });
Orders.Customers = Orders.belongsTo(Customers, { onDelete: 'cascade' });
Customers.Orders = Customers.hasMany(Orders, { as: 'Orders' });

sequelize.sync({ force: false });

exports.Prices = Prices;
exports.Products = Products;
exports.Customers = Customers;
exports.Orders = Orders;
exports.Sequelize = sequelize;