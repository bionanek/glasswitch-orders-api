class Validate {
    static ValidateIdExists(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('Given ID doesn\'t exist.');
        }
    }
}

module.exports = {
    Validate
}