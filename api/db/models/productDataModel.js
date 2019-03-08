const Types = require('sequelize');

exports.productDataModel = {
    id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Types.STRING, allowNull: false },
    description: { type: Types.STRING, allowNull: true },
    type: { type: Types.STRING, allowNull: false },
    category: { 
        type: Types.STRING,
        allowNull: false,
        defaultValue: ''
    },
    width: { type: Types.DOUBLE, allowNull: true },
    height: { type: Types.DOUBLE, allowNull: true },
    depth: { type: Types.DOUBLE, allowNull: true },
    image: { type: Types.STRING, allowNull: false }
};