const Prices = require('@db/dbHelper').Prices;

exports.Prices = Prices;

exports.createPrice = async (priceData) => {
    return await Prices.create(priceData)
};

exports.getAll = async () => {
    return await Prices.findAll()
        .map(el => el.get({ plain: true }));
};