const fileSystem = require("fs");

exports.imageDelete = fileName => {
  fileSystem.unlink("./productsImages/" + fileName, error => {
    if (error) throw error.message;
  });
};

exports.imageRename = (oldFileName, newFileName) => {
  fileSystem.rename(
    "./productsImages/" + oldFileName,
    "./productsImages/" + newFileName,
    error => {
      if (error) throw error.message;
    }
  );
};
