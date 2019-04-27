const orderRepo = require('@repos/orderRepository')
const productRepo = require('@repos/productRepository')

class OrderCounters {
    static async TotalCount(order, productId, quantity) {
        // const productsCount = await order.dataValues.productsCount
        // const productsTotalPrice = await order.dataValues.productsTotalPrice
        const product = await productRepo.getById(productId)
        // const pln = await product.price.pln
        // const eur = await product.price.eur
        // const usd = await product.price.usd

        switch (order.currency) {
            case 'pln':
                order.dataValues.productsTotalPrice += product.price.pln * quantity
                break;

            case 'eur':
                order.dataValues.productsTotalPrice += product.price.eur * quantity
                break;

            case 'usd':
                order.dataValues.productsTotalPrice += product.price.usd * quantity
                break;
        }

        order.dataValues.productsCount += quantity
        await orderRepo.updateOrder(order.id, order.dataValues)
    }

    static async DeleteCount(order, productId) {
        const product = await productRepo.getById(productId)
        const requestedProduct = await order.getProducts({ where: { id: productId } })

        switch (order.currency) {
            case 'pln':
                order.dataValues.productsTotalPrice -= product.price.pln * requestedProduct[0].name
                break;

            case 'eur':
                order.dataValues.productsTotalPrice -= product.price.eur * quantity
                break;

            case 'usd':
                order.dataValues.productsTotalPrice -= product.price.usd * quantity
                break;
        }

        order.dataValues.productsCount -= quantity
        await orderRepo.updateOrder(order.id, order.dataValues)
    }
}

module.exports = {
    OrderCounters
}