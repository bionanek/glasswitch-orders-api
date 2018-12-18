const Types = require('sequelize');

exports.productDataModel = {
    id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Types.STRING, allowNull: false },
    description: Types.STRING,
    type: { type: Types.STRING, allowNull: false },
    category: { 
        type: Types.STRING,
        allowNull: false,
        defaultValue: ''
     },
    width: Types.DOUBLE,
    height: Types.DOUBLE,
    depth: Types.DOUBLE,
    image: Types.STRING,
    // Product_priceID: { 
    //     type: Types.INTEGER, 
    //     allowNull: false, 
    //     references: { model: 'prices', key: 'id' },
    //     cascadeDelete: true 
    // }
};