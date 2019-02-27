const customersDomain = require('@domains/customersDomain');
const { CustomerValidation } = require('@validation/customerValidation');

exports.create = async (request, response, next) => {
    try {
        CustomerValidation.Validate(request);

        const customerData = request.body;
        const customer = await customersDomain.create(customerData);

        response.status(200).json(customer);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.update = async (request, response, next) => {
    try {
        CustomerValidation.Validate(request);

        const updateCustomerData = request.body;
        const customerId = request.params.customerId;
        const affectedRows = await customersDomain.update(customerId, updateCustomerData);
        
        response.status(200).json(affectedRows);
    } catch (error) {
        response.status(error.code).json(error);
    }
};

exports.delete = async (request, response, next) => {
    try {
        CustomerValidation.Validate(request);

        const customerId = request.params.customerId;
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
        CustomerValidation.Validate(request);

        let customer = await customersDomain.getById(request.params.customerId);

        response.status(200).json(customer);
    } catch (error) {
        response.status(error.code).json(error);
    }
};