const Customers = require('@db/dbHelper').Customers;
const { IdNotFound } = require('@helpers/errors');

class Verification {
    static async IdExists (resource, requestedId) {
        switch (resource) {
            case 'customer':
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
    Verification
}