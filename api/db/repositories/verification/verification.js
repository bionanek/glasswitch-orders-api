const Customers = require('@db/dbHelper').Customers
const Products = require('@db/dbHelper').Products
const Orders = require('@db/dbHelper').Orders
const { IdNotFound } = require('@helpers/errors')

var Resources = {
    Customers: 0, 
    Products: 1, 
    Orders: 2
}

class Verification {
    static async IdExists (resource, requestedId) {
        switch (resource) {
            case Resources.Customers:
                const requestedCustomer = await Customers.findById(requestedId)

                this.ResourceIsNull(Resources.Customers, requestedCustomer)
                break
            
            case Resources.Products:
                const requestedProduct = await Products.findById(requestedId)

                this.ResourceIsNull(Resources.Products, requestedProduct)
                break

            case Resources.Orders:
                const requestedOrder = await Orders.findById(requestedId)

                this.ResourceIsNull(Resources.Order, requestedOrder)
                break
        }
    }

    static ResourceIsNull(resources, requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            switch (resources) {
                case Resources.Customers:
                    throw new IdNotFound('Customer has not been found!')
                
                case Resources.Products:
                    throw new IdNotFound('Product has not been found!')
                
                case Resources.Orders:
                    throw new IdNotFound('Order has not been found!')
            }
        }
    }
}

module.exports = {
    Verification, Resources
}