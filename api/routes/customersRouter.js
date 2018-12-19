const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/customersController');

router.post('/', CustomersController.create);
router.patch('/:customerId', CustomersController.update);

module.exports = router;