const productDb = require('../db/models/product');

exports.createProduct = (productData) => {
    return new Promise((resolve, reject) => {
        if (!productData.name) {
            reject ('Missing fields');
            return;
        }

        productDb.saveProduct(productData)
            .then((product) => {
                resolve(product);
            })
            .catch((error) => {
                reject(error);
            });
    });
};