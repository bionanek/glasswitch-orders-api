const productDb = require('../db/models/product');

exports.create = (productData) => {
    return new Promise((resolve, reject) => {
        if (!productData.name || !/\S/.test(productData.name)) {
            reject(new Error('Name can\'t be empty'));
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

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        productDb.getAll()
            .then((products) => {
                if (products == null) {
                    throw Error('Error while getting all products');
                }

                console.log(products);

                resolve(products);
            })
            .catch((error) => {
                reject(error);
            });
    });
};