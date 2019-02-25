const customersDomain = require('@domains/customersDomain');

exports.create = async (request, response, next) => {
    let customerData = request.body;
    
    try {
        const customer = await customersDomain.create(customerData);
        response.status(200).json(customer);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.update = async (request, response, next) => {
    const updateCustomerData = request.body;
    const customerId = request.params.customerId;

    if (isNaN(customerId)) {
        return response.status(400).json({
            message: 'Customer ID must be an Integer'
        });
    }

    try {
        const affectedRows = await customersDomain.update(customerId, updateCustomerData);
        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.delete = async (request, response, next) => {
    const customerId = request.params.customerId;

    try {
        const affectedRows = await customersDomain.delete(customerId);
        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.getAll = async (request, response, next) => {
    try {
        let customers = await customersDomain.getAll();
        response.status(200).json(customers);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.getById = async (request, response, next) => {
    try {
        let customers = await customersDomain.getById(request.params.customerId);
        response.status(200).json(customers);
    } catch (error) {
        response.status(error.code).json(error);
    }
};