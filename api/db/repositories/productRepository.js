const Products = require('../dbHelper').Products;
const Prices = require('../dbHelper').Prices;

exports.Products = Products;

exports.createProduct = async (productData) => {
    if (productData === null || productData === undefined) {
        throw new Error('Provide Product object to create new Product.');
    }

    try {
        return await Products.create(productData, { include: [Products.Price], as: 'personId'});
    } catch (error) {
        throw new Error(error);
    }
};

//TODO
exports.updateProduct = (productId, updatedProduct) => {
    return new Promise((resolve, reject) => {
        let priceUpdatePromise = Prices.update(updatedProduct.price, { where: { id: updatedProduct.priceId } });
        let productUpdatePromise = Products.update(updatedProduct, { where: { id: productId } });

        Promise.all([priceUpdatePromise, productUpdatePromise]).then((results) => {
            let totalAffectedRows = 0;
            results.forEach((rowsAffectedInCall) => totalAffectedRows += parseInt(rowsAffectedInCall));
            
            resolve(totalAffectedRows);
        }).catch((error) =>{
            reject(error);
        });
    });
};

//TODO
exports.deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        let affectedRows = 0;
        let priceId;
        
        Products.findById(productId)
            .then((product) => {
                if (product === null || product === undefined) {
                    return reject({ message: 'Product with given ID doesn\'t exist' });
                }

                priceId = product.priceId;
                return Products.destroy({ where: { id: productId }, cascade: true });
            })
            .then((removedRows) => {
                affectedRows += removedRows;
                return Prices.destroy({ where: { id: priceId } });
            })
            .then((removedRows) => {
                affectedRows += removedRows;
                resolve(affectedRows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.getAll = async () => {
    let allProducts;

    try {
        allProducts = await Products.findAll({ include: [Products.Price] }).map(el => el.get({ plain: true }));
    } catch (error) {
        throw new Error(error);
    }

    if (allProducts === null || allProducts === undefined) {
        throw new Error('Products table is empty. REPO');
    } else {
        return allProducts;
    }
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
    } else {
        return requestedProduct;
    }
};