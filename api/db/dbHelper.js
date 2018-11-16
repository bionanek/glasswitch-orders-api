const config = require('config');
const Sequelize = require('sequelize');

let sequelize;

exports.getSequelize = () => {
    if (sequelize) {
        return sequelize;
    }

    const options = config.dbOptions;
    sequelize = new Sequelize(options);

    return sequelize;
}