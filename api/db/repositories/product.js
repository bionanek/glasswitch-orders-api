const dataModel = require('../models/productDataModel')

var ProductSchema = dataModel.productDataModel;

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

exports.getById = (productId) => {
    return new Promise((resolve, reject) => {
        ProductSchema.findById(productId)
            .then(product => {
                if (product == null) {
                    reject('Product with given ID doesn\'t exist');
                }

                resolve(product);
            })
            .catch(error => {
                reject(error);
            })
    });
};