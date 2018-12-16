const priceRepo = require('../db/repositories/priceRepository');

exports.create = (priceData) => {
    return new Promise((resolve, reject) => {
        priceRepo.savePrice(priceData)
            .then((savedPrice) => {
                resolve(savedPrice);
            })
            .catch((error) => {
                reject(error);
            })
    });
}