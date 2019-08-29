const fileSystem = require("fs")
const pdf = require("html-pdf")
const productsCatalogTemplate = require("./pdf-templates/productsCatalogTemplate")

const folderPath = "./pdfs/"

const localeDate = new Date().toLocaleDateString().split("/")
const localeTime = new Date().toLocaleTimeString().split(":")

const fixedDate = `${localeDate[0]}-${localeDate[1]}-${localeDate[2]}`
const fixedTime = `${localeTime[0]}-${localeTime[1]}-${localeTime[2]}`
let fileName = `${fixedDate}-${fixedTime}-`

exports.generateProductsCatalogPdf = products => {
	folderCreateIfNeeded()
	fileName += `Products-Catalog.pdf`

	pdf
		.create(productsCatalogTemplate(products), {})
		.toFile(`${folderPath}/${fileName}`, err => {})

	return folderPath + fileName
}

folderCreateIfNeeded = () => {
	if (!fileSystem.existsSync(folderPath)) fileSystem.mkdirSync(folderPath)
}
