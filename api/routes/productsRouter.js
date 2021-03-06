const express = require("express")
const router = express.Router()
const { ProductValidation } = require("@validation/productValidation")
const ProductsController = require("@controllers/productsController")
const { upload } = require("@helpers/image-upload/productImageUpload")

router.get("/", ProductsController.getAll)
router.get(
	"/search",
	ProductValidation.Validate,
	ProductsController.getSearchResults
)
router.get(
	"/by/price",
	ProductValidation.Validate,
	ProductsController.getByPriceRange
)
router.get(
	"/:productId",
	ProductValidation.Validate,
	ProductsController.getById
)
router.post(
	"/",
	upload.single("image"),
	ProductValidation.Validate,
	ProductsController.create
)
router.patch(
	"/:productId",
	upload.single("image"),
	ProductValidation.Validate,
	ProductsController.update
)
router.delete(
	"/:productId",
	ProductValidation.Validate,
	ProductsController.delete
)
router.post(
	"/generateProductsCatalog",
	ProductsController.generateProductsCatalog
)

module.exports = router
