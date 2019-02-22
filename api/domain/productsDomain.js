const productRepo = require('../db/repositories/productRepository');
const pricesDomain = require('./pricesDomain');

exports.create = async (productData) => {
    let newProduct;

    if (!productData.name || !/\S/.test(productData.name)) {
        throw new Error('Name can\'t be empty');
    } else if (productData.price === null || productData.price === undefined) {
        throw new Error('Price has to be provided for a product.');
    }

    try {
        newProduct = await productRepo.createProduct(productData);
    } catch (error) {
        throw new Error(error);
    }

    return newProduct;
};

exports.update = async (productId, updatedProductData) => {
    if (updatedProductData === null || updatedProductData === undefined) {
        throw new Error('Provide values to update.');
    }

    let affectedRows = await productRepo.updateProduct(productId, updatedProductData);

    if (affectedRows === 0) {
        throw new Error('No product updated.');
    }

    return affectedRows;
};

exports.delete = async (productId) => {
    if (isNaN(productId)) {
        throw new Error('Product ID must be an integer. Given ID: ' + productId);
    }

    let affectedRows = await productRepo.deleteProduct(productId);

    if (affectedRows === 0) {
        throw new Error('No product deleted.');
    }

    return affectedRows;
};

exports.getAll = async () => {
    let fetchedRows = await productRepo.getAll();

    if (fetchedRows === 0) {
        throw new Error('No products found.');
    }

    return fetchedRows;
};

exports.getById = async (productId) => {
    if (isNaN(productId)) {
        throw new Error('Product ID must be an integer. Given ID: ' + productId)
    }

    let fetchedRow = await productRepo.getById(productId);

    if (fetchedRow === 0) {
        throw new Error('No product found.');
    }

    return fetchedRow;
};