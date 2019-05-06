class OrderHelpers {
    static async addQuantityAndTotalPrice(order, product, quantity) {
        const orderDataValues = order.dataValues

        orderDataValues.productsCount += quantity

        orderDataValues.productsTotalPrice += 
            product.price[order.currency] * quantity

        return orderDataValues
    }

    static async subtractQuantityAndTotalPrice(order, product, quantity) {
        const orderDataValues = order.dataValues

        orderDataValues.productsCount -= quantity

        orderDataValues.productsTotalPrice -= 
            product.price[order.currency] * quantity

        return orderDataValues
    }
}

module.exports = {
    OrderHelpers
}