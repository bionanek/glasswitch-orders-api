const Products = require('@db/dbHelper').Products;
const Prices = require('@db/dbHelper').Prices;
const { IdNotFound } = require('@helpers/errors');
const { Validate } = require('@repos/verification/verificate');

exports.Products = Products;

exports.createProduct = async (productData) => {
    return await Products.create(productData, { include: [Products.Price], as: 'productId'});
};

exports.updateProduct = async (productId, updatedProductData) => {
    const requestedProduct = await Products.findById(productId);

    Validate.ValidateIdExists(requestedProduct);

    const productUpdate = await Products.update(updatedProductData, 
        { where: { id: productId } });
    const priceUpdate = await Prices.update(updatedProductData.price, 
        { where: { id: updatedProductData.priceId } });

    return parseInt(productUpdate) + parseInt(priceUpdate);
};

exports.deleteProduct = async (productId) => {
    const requestedProduct = await Products.findById(productId);

    Validate.ValidateIdExists(requestedProduct);

    let affectedRows = 0; 
    const priceId = requestedProduct.priceId;

    affectedRows += await Products.destroy(
        { where: { id: productId }, cascade: true });
    affectedRows += await Prices.destroy(
        { where: { id: priceId } });

    return affectedRows;
};

exports.getAll = async () => {
    const allProducts = await Products.findAll({ include: [Products.Price] })
        .map(el => el.get({ plain: true }));

    return allProducts;
};

exports.getById = async (productId) => {
    const requestedProduct = await Products.findById(productId, 
        { include: [Products.Price] });

    Validate.ValidateIdExists(requestedProduct);

    return requestedProduct;
};