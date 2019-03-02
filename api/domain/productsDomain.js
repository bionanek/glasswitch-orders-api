const productRepo = require('@repos/productRepository');
const pricesDomain = require('@domains/pricesDomain');
const { IdNotFound } = require('@helpers/errors');
const { SequelizeError } = require('@helpers/errors');

exports.create = async (productData) => {
    try {
        return await productRepo.createProduct(productData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (productId, updatedProductData) => {
    try {
        await productRepo.getById(productId);

        return await productRepo.updateProduct(productId, updatedProductData);
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.');
        }
        throw new IdNotFound('Product with given ID doesn\'t exists. No product was updated.');
    }
};

exports.delete = async (productId) => {
    try {
        return await productRepo.deleteProduct(productId);
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exists. No product was deleted.');
    }
};

exports.getAll = async () => {
    try {
        return await productRepo.getAll();
    } catch (error) {
        throw new Error('No products were found.')
    }
};

exports.getById = async (productId) => {
    try {
        return await productRepo.getById(productId);
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exists.');
    }
};