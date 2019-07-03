const multer = require("multer")
const fs = require("fs")

const dateNoTime = new Date().toISOString().split("T")[0]

const storage = multer.diskStorage({
	destination: function(request, file, callback) {
		const folderPath = "./productsImages/"
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath)
		}
		callback(null, folderPath)
	},
	filename: function(request, file, callback) {
		const fileName = request.body.code + "_" + dateNoTime + ".jpg"
		request.body.imageUrl = fileName

		callback(null, fileName)
	}
})

const upload = multer({
	storage: storage
})

module.exports = {
	upload
}
