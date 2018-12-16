const Prices = require('../dbHelper').Prices;

exports.Prices = Prices;

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Prices.findAll()
            .map(el => el.get({ plain: true }))
            .then((prices) => {
                resolve(prices);
            })
            .catch((error) => {
                reject(error)
            });
    });
};

exports.savePrice = (priceData) => {
    return new Promise((resolve, reject) => {
        Prices.create(priceData)
            .then((savedPrice) => {
                resolve(savedPrice);
            })
            .catch((error) => {
                reject(error);
            });
    })
};