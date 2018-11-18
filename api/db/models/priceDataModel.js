const Types = require('sequelize');

exports.priceDataModel = {
    id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pln: { type: Types.DOUBLE, allowNull: false },
    eur: { type: Types.DOUBLE, allowNull: false },
    usd: { type: Types.DOUBLE, allowNull: false }
};
