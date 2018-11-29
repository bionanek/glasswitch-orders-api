const Products = require('../dbHelper').Products;

exports.Products = Products;

exports.saveProduct = (productData) => {
    return new Promise((resolve, reject) => {
        Products.create(productData)
            .then((savedProduct) => {
                resolve(savedProduct);
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

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Products.findAll()
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
        Products.findById(productId)
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