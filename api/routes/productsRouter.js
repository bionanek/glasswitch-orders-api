const express = require("express");
const router = express.Router();
const { ProductValidation } = require("@validation/productValidation");

const ProductsController = require("@controllers/productsController");

router.get("/", ProductsController.getAll);
router.get(
	"/search",
	ProductValidation.Validate,
	ProductsController.getSearchResults
);
router.get(
	"/:productId",
	ProductValidation.Validate,
	ProductsController.getById
);
router.get("/by/price", ProductsController.getByPriceRange);
router.post("/", ProductValidation.Validate, ProductsController.create);
router.patch(
	"/:productId",
	ProductValidation.Validate,
	ProductsController.update
);
router.delete(
	"/:productId",
	ProductValidation.Validate,
	ProductsController.delete
);

module.exports = router;
