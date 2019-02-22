const Products = require('../dbHelper').Products;
const Prices = require('../dbHelper').Prices;

exports.Products = Products;

exports.createProduct = async (productData) => {
    let newProduct;

    if (productData === null || productData === undefined) {
        throw new Error('Provide Product object to create new Product.');
    }

    try {
        newProduct = await Products.create(productData, { include: [Products.Price], as: 'personId'});
    } catch (error) {
        throw new Error(error);
    }

    return newProduct;
};


exports.updateProduct = (productId, updatedProductData) => {
    return new Promise((resolve, reject) => {
        let priceUpdatePromise = Prices.update(updatedProductData.price, { where: { id: updatedProductData.priceId } });
        let productUpdatePromise = Products.update(updatedProductData, { where: { id: productId } });

        Promise.all([priceUpdatePromise, productUpdatePromise]).then((results) => {
            let totalAffectedRows = 0;
            results.forEach((rowsAffectedInCall) => totalAffectedRows += parseInt(rowsAffectedInCall));
            
            resolve(totalAffectedRows);
        }).catch((error) =>{
            reject(error);
        });
    });
};

// exports.updateProduct = async (productId, updatedProductData) => {    
//     let productUpdate = await Products.update(updatedProductData, { where: { id: productId } });
    
//     let priceUpdate = await Prices.update(updatedProductData.price, { where: { id: updatedProductData.priceId } });

//     try {
//         Promise.all([productUpdate, priceUpdate])
//     } catch (error) {
//         throw new Error(error);
//     }
// };

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

// exports.deleteProduct = async (productId) => {
//     let affectedRows = 0;
//     let priceId;

//     const requestedProduct = await Products.findById(productId);

//     if (requestedProduct === null || requestedProduct === undefined) {
//         throw new Error('Product with given ID doesn\'t exist');
//     }

//     try {
//         priceId = product.priceId;

//         return Products.destroy({ where: { id: productId }, cascade: true });
//     } catch (error) {
//         throw new Error(error);
//     }
// };

exports.getAll = async () => {
    let allProducts;

    try {
        allProducts = await Products.findAll({ include: [Products.Price] }).map(el => el.get({ plain: true }));
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