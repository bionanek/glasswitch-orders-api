const fileSystem = require("fs");

exports.imageDelete = fileName => {
  fileSystem.unlink("productsImages/" + fileName, function(err) {
    if (err) throw new Error(err);
    console.log("Successful remove");
  });
};
