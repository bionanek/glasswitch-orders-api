const productsDomain = require('../domain/productsDomain');

exports.create = (request, response, next) => {
    var productData = request.body;

    productsDomain.create(productData)
        .then(product => {
            response.status(200).json(product);
        })
        .catch(error => {
            response.status(400).json({
                message: error.message,
                trace: error.trace
            });
        })
};

exports.update = (request, response, next) => {
    const productId = request.params.productId;

    productsDomain.update(productId, request.body)
        .then((affectedRows) => {
            response.status(200).json(affectedRows);
        })
        .catch((error) => {
            response.status(500).json({
                message: error.message,
                trace: error.trace
            });
        });
};

exports.delete = (request, response, next) => {
    const productId = request.params.productId;

    productsDomain.delete(productId)
        .then((numberOfRemovedRows) => {
            response.status(200).json(numberOfRemovedRows);
        })
        .catch((error) => {
            console.log('controller');
            console.log(error);
            response.status(500).json({
                message: error.message,
                trace: error.trace
            });
        });
};

exports.getAll = (request, response, next) => {
    productsDomain.getAll()
        .then((products) => {
            response.status(200).json(products);
        })
        .catch((error) => {
            response.status(400).json({
                message: error.message,
                trace: error.trace
            });
        });
};

exports.getById = (request, response, next) => {
    productsDomain.getById(request.params.productId)
        .then((product) => {
            response.status(200).json(product);
        })
        .catch((error) => {
            response.status(400).json({
                message: error.message,
                trace: error.trace
            });
        });
};
