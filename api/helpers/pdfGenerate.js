const fileSystem = require("fs")
const pdf = require("html-pdf")
const productsCatalogTemplate = require("../helpers/pdf-templates/productsCatalogTemplate")

const folderPath = "./pdfs/"

const localeDate = new Date().toLocaleDateString().split("/")
const localeTime = new Date().toLocaleTimeString().split(":")

const cutDate = `${localeDate[0]}-${localeDate[1]}-${localeDate[2]}`
const cutTime = `${localeTime[0]}-${localeTime[1]}-${localeTime[2]}`

exports.productsCatalog = products => {
	if (!fileSystem.existsSync(folderPath)) fileSystem.mkdirSync(folderPath)

	const fileName = `${cutDate}-${cutTime}-Products-Catalog.pdf`

	pdf
		.create(productsCatalogTemplate(products), {})
		.toFile(`${folderPath}/${fileName}`, err => {})

	return folderPath + fileName
}
