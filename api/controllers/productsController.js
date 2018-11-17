const productsDomain = require('../domain/products');

exports.get_all = (request, response, next) => {
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
