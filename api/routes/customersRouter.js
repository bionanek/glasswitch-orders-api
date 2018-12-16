const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/customersController');

router.post('/', CustomersController.create);

module.exports = router;