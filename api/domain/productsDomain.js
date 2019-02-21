const productRepo = require('../db/repositories/productRepository');
const pricesDomain = require('./pricesDomain');

//TODO
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

//MUST CHECK
exports.update = async (productId, updatedProductData) => {
    if (updatedProductData === null) {
        throw new Error('Provide values to update.');
    }

    let affectedRows = await productRepo.updateProduct(productId, updatedProductData);

    if (affectedRows == 0) {
        throw new Error('No product updated.');
    } else {
        return affectedRows;
    }
};

exports.delete = async (productId) => {
    if (isNaN(productId)) {
        throw new Error('Product ID must be an integer. Given ID: ' + productId);
    }

    let affectedRows = await productRepo.deleteProduct(productId);

    if (affectedRows === 0) {
        throw new Error('No product deleted.');
    } else {
        return affectedRows;
    }
};

exports.getAll = async () => {
    let fetchedRows = await productRepo.getAll();

    if (fetchedRows === 0) {
        throw new Error('No products found.');
    } else {
        return fetchedRows;
    }
};

exports.getById = async (productId) => {
    if (isNaN(productId)) {
        throw new Error('Product ID must be an integer. Given ID: ' + productId)
    }

    let fetchedRow = await productRepo.getById(productId);

    if (fetchedRow === 0) {
        throw new Error('No product found.');
    } else {
        return fetchedRow;
    }
};