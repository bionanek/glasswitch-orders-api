const Sequelize = require('sequelize');
const dbHelper = require('../dbHelper');

var db = dbHelper.getSequelize();

const dataModel = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
})

exports.productDataModel = dataModel;