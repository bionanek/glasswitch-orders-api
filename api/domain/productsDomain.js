const productRepo = require("@repos/productRepository")
const { IdNotFound, SequelizeError } = require("@helpers/errors")
const { Verification, Resources } = require("@verify/verification")
const imageUtils = require("@helpers/imageUtils")
const fileSystem = require("fs")
const pdf = require("html-pdf")
const productsCatalogTemplate = require("../helpers/pdf-templates/productsCatalogTemplate")

exports.create = async productData => {
	try {
		return await productRepo.createProduct(productData)
	} catch (error) {
		throw new Error(error)
	}
}

exports.update = async (productId, updatedProductData) => {
	try {
		await Verification.IdExists(Resources.Products, productId)
		const product = await productRepo.getById(productId)
		imageUpdate(product, updatedProductData)

		return await productRepo.updateProduct(productId, updatedProductData)
	} catch (error) {
		if (error.name.includes("Sequelize")) {
			throw new SequelizeError("Field cannot be null.")
		}
		throw new IdNotFound(
			"Product with given ID doesn't exist. No product was updated."
		)
	}
}

exports.delete = async productId => {
	try {
		await Verification.IdExists(Resources.Products, productId)
		const product = await productRepo.getById(productId)
		imageUtils.imageDelete(product.imageUrl)

		return await productRepo.deleteProduct(productId)
	} catch (error) {
		throw new IdNotFound(
			"Product with given ID doesn't exist. No product was deleted."
		)
	}
}

exports.getAll = async () => {
	try {
		return await productRepo.getAll()
	} catch (error) {
		throw new Error("No products were found.")
	}
}

exports.getById = async productId => {
	try {
		await Verification.IdExists(Resources.Products, productId)

		return await productRepo.getById(productId)
	} catch (error) {
		throw new IdNotFound("Product with given ID doesn't exist.")
	}
}

exports.getSearchResults = async searchPhrase => {
	return await productRepo.getSearchResults(searchPhrase)
}

const imageUpdate = (product, updatedProductData) => {
	if (product.imageUrl === updatedProductData.imageUrl) return

	if (updatedProductData.image === "undefined") {
		const dateNoTime = new Date().toISOString().split("T")[0]
		updatedProductData.imageUrl =
			updatedProductData.code + "_" + dateNoTime + ".jpg"
		imageUtils.imageRename(product.imageUrl, updatedProductData.imageUrl)
	}

	if (updatedProductData.image === undefined) {
		imageUtils.imageDelete(product.imageUrl)
	}
}

exports.getByPriceRange = async (priceRange, order) => {
	try {
		return await productRepo.getByPriceRange(priceRange, order)
	} catch (ex) {
		throw new Error(ex)
	}
}

exports.generateProductsCatalog = products => {
	try {
		const folderPath = "./pdfs/"
		const fileName = `${new Date().toDateString()}-Products-Catalog.pdf`

		if (!fileSystem.existsSync(folderPath)) {
			fileSystem.mkdirSync(folderPath)
		}

		pdf
			.create(productsCatalogTemplate(products))
			.toFile(`${folderPath}/${fileName}`, err => {})

		return folderPath + fileName
	} catch (error) {
		throw new Error(error.message)
	}
}
