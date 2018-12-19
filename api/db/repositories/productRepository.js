const Products = require('../dbHelper').Products;
const Prices = require('../dbHelper').Prices;

exports.Products = Products;

exports.createProduct = (productData) => {
    return new Promise((resolve, reject) => {
        Products.create(productData, { include: [Products.Price], as: 'personId' })
            .then((createdProduct) => {
                resolve(createdProduct);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

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

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Products.findAll({ include: [Products.Price] })
            .map(el => el.get({ plain: true }))
            .then((products) => {
                resolve(products);
            })
            .catch((error) => {
                reject(error)
            });
    });
};

exports.getById = (productId) => {
    return new Promise((resolve, reject) => {
        Products.findById(productId, { include: [Products.Price] })
            .then(product => {
                if (product == null) {
                    reject('Product with given ID doesn\'t exist');
                }

                resolve(product);
            })
            .catch(error => {
                reject(error);
            })
    });
};