const express = require('express')
const router = express.Router()
const { CustomerValidation } = require('@validation/customerValidation')

const CustomersController = require('@controllers/customersController')

router.get('/', CustomersController.getAll)
router.get('/search', CustomerValidation.Validate, CustomersController.getSearchResults)
router.get('/:customerId', CustomerValidation.Validate, CustomersController.getById)
router.post('/', CustomerValidation.Validate, CustomersController.create)
router.patch('/:customerId', CustomerValidation.Validate, CustomersController.update)
router.delete('/:customerId', CustomerValidation.Validate, CustomersController.delete)

module.exports = router