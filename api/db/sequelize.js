const config = require('config');
const Sequelize = require('sequelize');
const ProductModel = require('./models/product');

const options = config.dbOptions;
const sequelize = new Sequelize(options);

sequelize
    .authenticate()
    .then(() => {
        console.log('connection established...');
    })
    .catch((error) => {
        console.log('DB Connection Error:', error);
    });

const Products = ProductModel(sequelize, Sequelize);

sequelize
    .sync()
    .then(() => {
        console.log('Products table has been created');
    })
    .catch((error) => {
        console.log('Error occured while creating Products table:', error);
    });

module.exports = {
    Products: Products
};