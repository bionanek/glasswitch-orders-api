const Customers = require('@db/dbHelper').Customers;
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
        }
    }

    static ResourceIsNull(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('ID NOT FOUND');
        }
    }
}

module.exports = {
    Verification, Resources
}