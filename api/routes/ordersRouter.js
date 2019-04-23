const express = require('express');
const router = express.Router();
const { OrderValidation } = require('@validation/orderValidation');

const OrdersController = require('@controllers/ordersController');

router.get('/', OrdersController.getAll);
router.get('/:orderId', OrderValidation.Validate, OrdersController.getById);
router.post('/', OrderValidation.Validate, OrdersController.create);
router.patch('/:orderId', OrderValidation.Validate, OrdersController.update);
router.delete('/:orderId', OrderValidation.Validate, OrdersController.delete);

router.patch('/:orderId/product', OrdersController.addProduct)

module.exports = router;