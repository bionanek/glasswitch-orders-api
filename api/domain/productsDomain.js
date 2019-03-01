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

        const affectedRows = await productRepo.updateProduct(productId, updatedProductData);

        return affectedRows;
    } catch (error) {
        if (error.name.includes("Sequelize")) {
            throw new SequelizeError('Field cannot be null.');
        }
        throw new IdNotFound('Product with given ID doesn\'t exists. No product was updated.');
    }
};

exports.delete = async (productId) => {
    try {
        const affectedRows = await productRepo.deleteProduct(productId);

        return affectedRows;
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exists. No product was deleted.');
    }
};

exports.getAll = async () => {
    try {
        const fetchedRows = await productRepo.getAll();

        return fetchedRows;
    } catch (error) {
        throw new Error('No products were found.')
    }
};

exports.getById = async (productId) => {
    try {
        const fetchedRow = await productRepo.getById(productId);

        return fetchedRow;
    } catch (error) {
        throw new IdNotFound('Product with given ID doesn\'t exists.');
    }
};