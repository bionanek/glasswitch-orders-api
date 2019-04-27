const orderRepo = require('@repos/orderRepository')
const productRepo = require('@repos/productRepository')

class OrderCounters {
    static async AddCounters(order, productId, quantity) {
        const product = await productRepo.getById(productId)

        let productsCount = order.dataValues.productsCount
        let productsTotalPrice = order.dataValues.productsTotalPrice
        const pln = product.price.pln
        const eur = product.price.eur
        const usd = product.price.usd

        switch (order.currency) {
            case 'pln':
                productsTotalPrice += pln * quantity
                break;

            case 'eur':
                productsTotalPrice += eur * quantity
                break;

            case 'usd':
                productsTotalPrice += usd * quantity
                break;
        }

        productsCount += quantity

        order.dataValues.productsCount = productsCount
        order.dataValues.productsTotalPrice = productsTotalPrice

        await orderRepo.updateOrder(order.id, order.dataValues)
    }

    static async SubsCounters(order, productId) {
        const product = await productRepo.getById(productId)

        let productsCount = order.dataValues.productsCount
        let productsTotalPrice = order.dataValues.productsTotalPrice
        const pln = product.price.pln
        const eur = product.price.eur
        const usd = product.price.usd

        const requestedProduct = await order.getProducts({ where: { id: productId } })
        const quantity = requestedProduct[0].products_orders.quantity

        switch (order.currency) {
            case 'pln':
                productsTotalPrice -= pln * quantity
                break;

            case 'eur':
                productsTotalPrice -= eur * quantity
                break;

            case 'usd':
                productsTotalPrice -= usd * quantity
                break;
        }

        productsCount -= quantity

        order.dataValues.productsCount = productsCount
        order.dataValues.productsTotalPrice = productsTotalPrice

        await orderRepo.updateOrder(order.id, order.dataValues)
    }
}

module.exports = {
    OrderCounters
}