const Customers = require('@db/dbHelper').Customers;
const Products = require('@db/dbHelper').Products;
const { IdNotFound } = require('@helpers/errors');

var Resources = {
    Customers: 0, 
    Products: 1, 
    Orders: 2
}

class Verification {
    static async IdExists (resource, requestedId) {
        switch (resource) {
            case Resources.Customers:
                const requestedCustomer = await Customers.findById(requestedId);

                this.ResourceIsNull(requestedCustomer);
                break;
            
            case Resources.Products:
                const requestedProduct = await Products.findById(requestedId);

                this.ResourceIsNull(requestedProduct);
                break;
        }
    }

    static ResourceIsNull(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('ID has not been found!');
        }
    }
}

module.exports = {
    Verification, Resources
}