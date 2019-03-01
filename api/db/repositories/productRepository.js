const Products = require('@db/dbHelper').Products;
const Prices = require('@db/dbHelper').Prices;

exports.Products = Products;

exports.createProduct = async (productData) => {
    try {
        return await Products.create(productData, { include: [Products.Price], as: 'productId'});
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateProduct = async (productId, updatedProductData) => {
    try {
        const productUpdate = await Products.update(updatedProductData, 
            { where: { id: productId } });
        const priceUpdate = await Prices.update(updatedProductData.price, 
            { where: { id: updatedProductData.priceId } });

        const totalAffectedRows = parseInt(productUpdate) + parseInt(priceUpdate);
        
        return totalAffectedRows;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteProduct = async (productId) => {
    try {
        let affectedRows = 0;
        let priceId;

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
    try {
        const allProducts = await Products.findAll({ include: [Products.Price] })
            .map(el => el.get({ plain: true }));

        return allProducts;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getById = async (productId) => {
    try {
        const requestedProduct = await Products.findById(productId, 
            { include: [Products.Price] });

        return requestedProduct;
    } catch (error) {
        throw new Error(error);
    }
};