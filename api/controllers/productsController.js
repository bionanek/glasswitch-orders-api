const Products = require('../db/sequelize').Products;

exports.hello_world = (request, response, next) => {
    const responseBody = {
        message: "Hello world"
    };

    response.status(200).json(responseBody);
};

exports.get_all = (request, response, next) => {
    Products.findAll()
        .then((products) => {
            response.status(200).json({
                Products: products,
                Total: products.length
            });
        });
};