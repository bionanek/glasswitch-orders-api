const productRepo = require('@repos/productRepository');
const pricesDomain = require('@domains/pricesDomain');

exports.create = (productData) => {
    return new Promise(async (resolve, reject) => {
        if (!productData.name || !/\S/.test(productData.name)) {
            reject(new Error('Name can\'t be empty'));
            return;
        } else if (productData.price == undefined || productData.price === null) {
            reject(new Error('Price has to be provided for a product.'));
            return;
        }

        productRepo.createProduct(productData)
            .then((product) => {
                resolve(product);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.update = (productId, updatedProduct) => {
    return new Promise((resolve, reject) => {
        productRepo.updateProduct(productId, updatedProduct)
            .then((affectedRows) => {
                resolve(affectedRows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.delete = (productId) => {
    return new Promise((resolve, reject) => {
        if (isNaN(productId)) {
            reject({ message: 'Product ID must be an integer. Given ID: ' + productId });
            return;
        } else if (productId < 0) {
            reject({ message: 'Product ID must be a positive number. Given ID: ' + productId });
            return;
        }

        productRepo.deleteProduct(productId)
            .then((removedRows) => {
                resolve(removedRows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        productRepo.getAll()
            .then((products) => {
                if (products == null) {
                    throw Error('Error while getting all products');
                }

                resolve(products);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.getById = (productId) => {
    return new Promise((resolve, reject) => {
        productRepo.getById(productId)
            .then((product) => {
                if (product == null) {
                    throw Error('Error while getting product by id');
                }

                resolve(product);
            })
            .catch((error) => {
                reject(error);
            });
    });
};