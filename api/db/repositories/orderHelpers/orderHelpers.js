const orderDomain = require('@domains/ordersDomain')
const orderRepo = require('@repos/orderRepository')
const productRepo = require('@repos/productRepository')
const { Verification, Resources } = require('@verify/verification')

class OrderHelpers {
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

        const orderDataValues = order.dataValues
        let productsCount = orderDataValues.productsCount
        let productsTotalPrice = orderDataValues.productsTotalPrice

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

        orderDataValues.productsCount = productsCount
        orderDataValues.productsTotalPrice = productsTotalPrice

        await orderRepo.updateOrder(order.id, orderDataValues)
    }

    static async CurrencyChange(order, updatedOrderData) {
        await orderDomain.deleteProduct(order, order.products)

        await orderRepo.updateOrder(order.id, updatedOrderData)
        const updatedOrder = await orderRepo.getById(order.id)

        for (let n = 0; n < order.products.length; n++) {
            const products_orders = order.products[n].products_orders

            await this.AddCounters(updatedOrder, products_orders.productId, products_orders.quantity)

            orderRepo.addProduct(updatedOrder, products_orders.productId, products_orders.quantity)
        }
    }

    static async UpdateProducts(order, updatedProducts) {
        for (let n = 0; n < updatedProducts.length; n++) {
            let validateProduct = await order.getProducts({ where: { id: updatedProducts[n].id } })
            await Verification.IdExists(Resources.Products, updatedProducts[n].id)

            if (validateProduct.length === 0) {
                await orderDomain.addProduct(order, updatedProducts)
            } else {
                await orderDomain.changeQuantity(order, updatedProducts)
            }
        }
    }
}

module.exports = {
    OrderHelpers
}