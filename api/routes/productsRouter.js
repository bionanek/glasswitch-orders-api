const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:productId', ProductsController.getById);
router.post('/', ProductsController.create);
router.patch('/:productId', ProductsController.update);
router.delete('/:productId', ProductsController.delete);

module.exports = router;