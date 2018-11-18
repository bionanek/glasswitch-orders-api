const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:productId', ProductsController.getById);
router.post('/', ProductsController.create);

module.exports = router;