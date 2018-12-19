const customersDomain = require('./../domain/customersDomain');

exports.create = (request, response, next) => {
    let customerData = request.body;

    customersDomain.create(customerData)
        .then((customer) => {
            response.status(200).json(customer);
        })
        .catch((error) => {
            response.status(500).json({
                message: error.message,
                trace: error.trace
            });
        });
};

exports.update = async (request, response, next) => {
    const updateCustomerData = request.body;
    const customerId = request.params.customerId;

    if (isNaN(customerId)) { 
        return response.status(400).json({ 
            message: 'Customer ID must be an Intiger'
        });
    }

    try {
        const affectedRows = await customersDomain.update(customerId, updateCustomerData);

        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(404).json({
            message: error.message,
            trace: error.trace
        });
    }
};