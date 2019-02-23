const express = require('express');
const router = express.Router();

const CustomersController = require('@controllers/customersController');

router.get('/', CustomersController.getAll);
router.get('/:customerId', CustomersController.getById);
router.post('/', CustomersController.create);
router.patch('/:customerId', CustomersController.update);
router.delete('/:customerId', CustomersController.delete);

module.exports = router;