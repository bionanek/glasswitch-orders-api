const Products = require('../dbHelper').Products;
const Prices = require('../dbHelper').Prices;

exports.Products = Products;

exports.createProduct = async (productData) => {
    try {
        return await Products.create(productData, { include: [Products.Price], as: 'productId'});
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateProduct = async (productId, updatedProductData) => {    
    let productUpdate = await Products.update(updatedProductData, { where: { id: productId } }); 
    let priceUpdate = await Prices.update(updatedProductData.price, { where: { id: updatedProductData.priceId } });

    try {
        let totalAffectedRows = parseInt(productUpdate) + parseInt(priceUpdate);
        return totalAffectedRows;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteProduct = async (productId) => {
    let affectedRows = 0;
    let priceId;

    const requestedProduct = await Products.findById(productId);

    if (requestedProduct === null || requestedProduct === undefined) {
        throw new Error('Product with given ID doesn\'t exist');
    }

    try {
        return await Products.findById(productId)
            .then((product) => {
                priceId = product.priceId;
                return Products.destroy({ where: { id: productId }, cascade: true });
            })
            .then((removedRows) => {
                affectedRows += removedRows;
                return Prices.destroy({ where: { id: priceId } });            
            })
            .then((removedRows) => {
                affectedRows += removedRows;
                return affectedRows;
            })
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAll = async () => {
    let allProducts;

    try {
        allProducts = await Products.findAll({ include: [Products.Price] })
            .map(el => el.get({ plain: true }));
    } catch (error) {
        throw new Error(error);
    }

    if (allProducts === null || allProducts === undefined) {
        throw new Error('Products table is empty. REPO');
    }

    return allProducts;
};

exports.getById = async (productId) => {
    let requestedProduct;

    try {
        requestedProduct = await Products.findById(productId, { include: [Products.Price] });
    } catch (error) {
        throw new Error(error);
    }

    if (requestedProduct === null || requestedProduct === undefined) {
        throw new Error('Product with given ID doesn\'t exist')
    }

    return requestedProduct;
};