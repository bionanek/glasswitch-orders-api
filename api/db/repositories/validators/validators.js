class Validate {
    static ValidateIdExists(requestedProduct) {
        if (requestedProduct === null || requestedProduct === undefined) {
            throw new IdNotFound('Product with given ID doesn\'t exists.');
        }
    }
}

module.exports = {
    Validate
}