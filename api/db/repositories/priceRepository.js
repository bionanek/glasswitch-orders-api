const Prices = require('@db/dbHelper').Prices;

exports.Prices = Prices;

exports.createPrice = async (priceData) => {
    try {
        return await Prices.create(priceData)
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAll = () => {
    try {
        const requestedPrices = await Prices.findAll()
            .map(el => el.get({ plain: true }))

        return requestedPrices;
    } catch (error) {
        throw new Error(error);
    }
};