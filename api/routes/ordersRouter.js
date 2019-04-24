const express = require('express');
const router = express.Router();
const { OrderValidation } = require('@validation/orderValidation');

const OrdersController = require('@controllers/ordersController');

router.get('/', OrdersController.getAll);
router.get('/:orderId', OrderValidation.Validate, OrdersController.getById);
router.post('/', OrderValidation.Validate, OrdersController.create);
router.patch('/:orderId', OrderValidation.Validate, OrdersController.update);
router.patch('/:orderId/product', OrderValidation.ValidateAddProducts, OrdersController.addProduct)
router.delete('/:orderId', OrderValidation.Validate, OrdersController.delete);

module.exports = router;