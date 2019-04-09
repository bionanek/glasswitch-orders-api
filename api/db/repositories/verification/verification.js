const Customers = require('@db/dbHelper').Customers;
const { IdNotFound } = require('@helpers/errors');

class Verification {
    static async DataChecker (checkedInfo, requestedId) {
        switch (checkedInfo) {
            case 'customer':
                const requestedCustomer = await Customers.findById(requestedId);

                this.IdExists(requestedCustomer);
                break;
        }
    }

    static IdExists(requestedItem) {
        if (requestedItem === null || requestedItem === undefined) {
            throw new IdNotFound('ID NOT FOUND');
        }
    }
}

module.exports = {
    Verification
}