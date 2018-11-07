const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.hello_world);

module.exports = router;