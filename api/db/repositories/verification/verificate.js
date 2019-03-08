const { IdNotFound } = require('../../../helpers/errors');

class Verificate {
    static IdVerification(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('Given ID doesn\'t exists.');
        }
    }
}

module.exports = {
    Verificate
}