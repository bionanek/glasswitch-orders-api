const productsDomain = require("@domains/productsDomain")

exports.create = async (request, response, next) => {
	try {
		const productData = request.body
		const product = await productsDomain.create(productData)

		response.status(200).json(product)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.update = async (request, response, next) => {
	try {
		const updatedProductData = request.body
		const productId = request.params.productId
		const affectedRows = await productsDomain.update(
			productId,
			updatedProductData
		)

		response.status(200).json(affectedRows)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.delete = async (request, response, next) => {
	try {
		const productId = request.params.productId
		const affectedRows = await productsDomain.delete(productId)

		response.status(200).json(affectedRows)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.getAll = async (request, response, next) => {
	try {
		const products = await productsDomain.getAll()

		response.status(200).json(products)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.getById = async (request, response, next) => {
	try {
		const product = await productsDomain.getById(request.params.productId)

		response.status(200).json(product)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.getSearchResults = async (request, response) => {
	try {
		const filteredProducts = await productsDomain.getSearchResults(
			request.query.search
		)

		response.status(200).json(filteredProducts)
	} catch (erorr) {
		response.status(error.code).json(error)
	}
}

exports.getByPriceRange = async (request, response) => {
	try {
		const priceRange = {
			from: +request.query.priceFrom,
			to: +request.query.priceTo,
			currency: request.query.curr
		}
		const productsInPriceRange = await productsDomain.getByPriceRange(
			priceRange,
			request.query.order
		)

		response.status(200).json(productsInPriceRange)
	} catch (error) {
		response.status(error.code).json(error)
	}
}

exports.generateProductsCatalog = async (request, response) => {
	try {
		const generatedPdf = await productsDomain.generateProductsCatalog(
			request.body
		)

		setTimeout(() => {
			response.sendFile(generatedPdf, { root: "./" })
		}, 2500)
	} catch (error) {
		response.status(error.code).json(error)
	}
}
