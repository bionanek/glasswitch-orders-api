const Types = require('sequelize');

exports.orderDataModel = {
    id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productsCount:      { type: Types.INTEGER, allowNull: false },
    shippingCost:       { type: Types.DOUBLE,  allowNull: false },
    shippingCompany:    { type: Types.STRING,  allowNull: false },
    orderCost:          { type: Types.DOUBLE,  allowNull: false },
    currency:           { type: Types.STRING,  allowNull: false },
    settledPayment:     { type: Types.BOOLEAN, allowNull: false },
    notes:              { type: Types.STRING,  allowNull: false },
    email:              { type: Types.STRING,  allowNull: false },
    confirmationSent:   { type: Types.BOOLEAN, allowNull: false },
    proformaSent:       { type: Types.BOOLEAN, allowNull: false },
    factureSent:        { type: Types.BOOLEAN, allowNull: false },
    deadline:           { type: Types.STRING,  allowNull: false }
}