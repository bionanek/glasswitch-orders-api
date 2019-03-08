const priceRepo = require('@repos/priceRepository');

exports.create = async (priceData) => {
    try {
        return await priceRepo.createPrice(priceData);
    } catch (error) {
        throw new Error(error);
    }
}