const priceRepo = require('@repos/priceRepository');

exports.create = (priceData) => {
    return new Promise((resolve, reject) => {
        priceRepo.createPrice(priceData)
            .then((createdPrice) => {
                resolve(createdPrice);
            })
            .catch((error) => {
                reject(error);
            })
    });
}