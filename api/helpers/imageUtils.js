const fileSystem = require("fs")
const { FileOperationError } = require("@helpers/errors")

exports.imageDelete = fileName => {
	try {
		fileSystem.unlinkSync("./productsImages/" + fileName)
	} catch (error) {
		throw new FileOperationError(error.message)
	}
}

exports.imageRename = (oldFileName, newFileName) => {
	try {
		fileSystem.renameSync(
			"./productsImages/" + oldFileName,
			"./productsImages/" + newFileName
		)
	} catch (error) {
		throw new FileOperationError(error.message)
	}
}
