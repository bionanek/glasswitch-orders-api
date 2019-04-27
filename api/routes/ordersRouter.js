const express = require('express')
const router = express.Router()
const OrderValidation = require('@validation/orderValidation').OrderValidation
const OrdersController = require('@controllers/ordersController')

router.get('/', OrdersController.getAll)
router.get('/:orderId', OrderValidation.Validate, OrdersController.getById)
router.post('/', OrderValidation.Validate, OrdersController.create)
router.patch('/:orderId', OrderValidation.Validate, OrdersController.update)
router.delete('/:orderId', OrderValidation.Validate, OrdersController.delete)

router.patch('/:orderId/add-product', OrderValidation.ValidateAddProducts, OrdersController.addProduct)
router.patch('/:orderId/change-quantity', OrdersController.changeQuantity)
router.delete('/:orderId/delete-product', OrdersController.deleteProduct)

module.exports = router