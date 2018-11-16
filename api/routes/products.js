const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.get_all);
router.post('/', ProductsController.create);

module.exports = router;