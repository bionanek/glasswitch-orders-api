const Types = require('sequelize');

exports.orderDataModel = {
    id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productsCount:      { type: Types.INTEGER,   defaultValue: 0  },
    shippingCost:       { type: Types.DOUBLE,    allowNull: true  },
    shippingCompany:    { type: Types.STRING,    allowNull: true  },
    productsTotalPrice: { type: Types.DOUBLE,    defaultValue: 0  },
    currency:           { type: Types.STRING(3), allowNull: false },
    notes:              { type: Types.STRING,    allowNull: true  },
    email:              { type: Types.STRING,    allowNull: false },
    confirmationSent:   { type: Types.BOOLEAN,   allowNull: false },
    proformaSent:       { type: Types.BOOLEAN,   allowNull: false },
    invoiceSent:        { type: Types.BOOLEAN,   allowNull: false },
    settledPayment:     { type: Types.BOOLEAN,   allowNull: false },
    deadline:           { type: Types.STRING,  allowNull: false }
}