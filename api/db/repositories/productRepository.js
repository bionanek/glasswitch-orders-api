const Products = require('../dbHelper').Products;

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
        Products.update(
            updatedProduct,
            { where: { id: productId } }
        ).then((affectedRows) => {
            resolve(affectedRows);
        }).catch((error) =>{
            reject(error);
        });
    });
};

exports.deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        Products.destroy({ where: { id: productId }, cascade: true })
            .then((removedRows) => {
                if (removedRows === 1) {
                    resolve(removedRows);
                } else {
                    reject('Product with given ID doesn\'t exist');
                }
            })
            .catch((error) => {
                console.log('repo catch');
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