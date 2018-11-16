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
        console.log('Products table has been created');
    })
    .catch ((error) => {
    console.log('Error occured while creating Products table:', error);
});

exports.Product = ProductSchema;

exports.saveProduct = (productData) => {
    var product = ProductSchema.build(productData);

    return new Promise((resolve, reject) => {
        product.save()
            .then((savedProduct) => {
                console.log('Product created!');
                resolve(savedProduct);
            })
            .catch((error) => {
                console.log('Error occured when saving new product.');
                reject(error);
            });
    });
};