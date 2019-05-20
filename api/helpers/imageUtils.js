const fileSystem = require("fs");

exports.imageDelete = async fileName => {
  await fileSystem.unlinkSync("./productsImages/" + fileName);
};

exports.imageRename = async (oldFileName, newFileName) => {
  await fileSystem.renameSync(
    "./productsImages/" + oldFileName,
    "./productsImages/" + newFileName
  );
};
