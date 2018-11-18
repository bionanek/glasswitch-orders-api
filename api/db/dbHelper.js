const config = require('config');
const Sequelize = require('sequelize');
var PricesDataModel = require('./models/priceDataModel').priceDataModel;
var ProductsDataModel = require('./models/productDataModel').productDataModel
let sequelize;

function getSequelize() {
    if (sequelize) {
        return sequelize;
    }

    const options = config.dbOptions;

    return new Sequelize(options);
}

sequelize = getSequelize();

var Prices = sequelize.define('prices', PricesDataModel)
var Products = sequelize.define('products', ProductsDataModel);

sequelize.sync({ force: true });


exports.prices = Prices;
exports.products = Products;



