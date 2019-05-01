const productRepo = require('@repos/productRepository')

class OrderHelpers {
    static async addQuantityAndTotalPrice(order, productId, quantity) {
        const product = await productRepo.getById(productId)
        const orderDataValues = order.dataValues

        orderDataValues.productsCount += quantity

        orderDataValues.productsTotalPrice += 
            product.price[order.currency] * quantity

        return orderDataValues
    }

    static async substractQuantityAndTotalPrice(order, productId) {
        const product = await productRepo.getById(productId)
        const orderDataValues = order.dataValues

        const requestedProduct = await order.getProducts({ where: { id: productId } })
        const quantity = requestedProduct[0].products_orders.quantity

        orderDataValues.productsCount -= quantity

        orderDataValues.productsTotalPrice -= 
            product.price[order.currency] * quantity

        return orderDataValues
    }
}

module.exports = {
    OrderHelpers
}