const { IdNotFound } = require('../../../helpers/errors');

class Validate {
    static ValidateIdExists(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('Given ID doesn\'t exists.');
        }
    }
}

module.exports = {
    Validate
}