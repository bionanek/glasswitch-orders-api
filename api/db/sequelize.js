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
    // sequelize
    //     .authenticate()
    //     .then(() => {
    //         console.log('connection established...');
    //         return sequelize;
    //     })
    //     .catch((error) => {
    //         console.log('DB Connection Error:', error);
    //     });
}