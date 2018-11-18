const Prices = require('../dbHelper').prices;

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