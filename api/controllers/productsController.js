const productsDomain = require('../domain/products');

exports.hello_world = (request, response, next) => {
    const responseBody = {
        message: "Hello world"
    };

    response.status(200).json(responseBody);
};

exports.get_all = (request, response, next) => {
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
