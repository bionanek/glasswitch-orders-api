const Sequelize = require('sequelize');
const dbHelper = require('../dbHelper');

var db = dbHelper.getSequelize();

var ProductSchema = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
});

ProductSchema
    .sync({ force: false })
    .then(() => {
        console.log('Products table has been synced');
    })
    .catch ((error) => {
    console.log('Error occured while creating Products table:', error);
});

exports.Products = ProductSchema;

exports.saveProduct = (productData) => {
    return new Promise((resolve, reject) => {
        ProductSchema.create(productData)
            .then((savedProduct) => {
                resolve(savedProduct);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        ProductSchema.findAll()
            .map(el => el.get({ plain: true }))
            .then((products) => {
                resolve(products);
            })
            .catch((error) => {
                reject(error)
            });
    });
};