const orderRepo = require('@repos/orderRepository')
const productRepo = require('@repos/productRepository')

class OrderCounters {
    static async AddCounters(order, productId, quantity) {
        const product = await productRepo.getById(productId)
        
        const orderDataValues = order.dataValues
        let productsCount = orderDataValues.productsCount
        let productsTotalPrice = orderDataValues.productsTotalPrice

        switch (order.currency) {
            case 'pln':
                productsTotalPrice += product.price.pln * quantity
                break

            case 'eur':
                productsTotalPrice += product.price.eur * quantity
                break

            case 'usd':
                productsTotalPrice += product.price.usd * quantity
                break
        }

        productsCount += quantity

        orderDataValues.productsCount = productsCount
        orderDataValues.productsTotalPrice = productsTotalPrice

        await orderRepo.updateOrder(order.id, orderDataValues)
    }

    static async SubsCounters(order, productId) {
        const product = await productRepo.getById(productId)

        let productsCount = order.dataValues.productsCount
        let productsTotalPrice = order.dataValues.productsTotalPrice

        const requestedProduct = await order.getProducts({ where: { id: productId } })
        const quantity = requestedProduct[0].products_orders.quantity

        switch (order.currency) {
            case 'pln':
                productsTotalPrice -= product.price.pln * quantity
                break

            case 'eur':
                productsTotalPrice -= product.price.eur * quantity
                break

            case 'usd':
                productsTotalPrice -= product.price.usd * quantity
                break
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