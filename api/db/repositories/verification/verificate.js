const { IdNotFound } = require('@helpers/errors');

class Verificate {
    static IdExists(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('Given ID doesn\'t exist.');
        }
    }
}

module.exports = {
    Verificate
}