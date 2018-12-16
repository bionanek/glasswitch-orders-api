const customersDomain = require('./../domain/customersDomain');

exports.create = (request, response, next) => {
    let customerData = requrest.body;

    customersDomain.create(customerData)
        .then((customer) => {
            response.status(200).json(customer);    
        })
        .catch((error) => {
            response.status(400).json({
                message: error.message,
                trace: error.trace
            });
        });
};