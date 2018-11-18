const Sequelize = require('sequelize');
const dbHelper = require('../dbHelper');

var db = dbHelper.getSequelize();

exports.productDataModel = () => {
    return db.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING
    })
};