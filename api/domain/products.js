const productDb = require('../db/models/product');

exports.createProduct = (productData) => {
    return new Promise((resolve, reject) => {
        if (!productData.name) {
            reject ('Missing fields');
            return;
        }

        console.log('doing some data processing ....');

        productDb.saveProduct(productData)
            .then((product) => {
                resolve(product);
            })
            .catch((error) => {
                reject(error);
            });
    });
};