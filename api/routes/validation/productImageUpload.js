const multer = require("multer");

const fullDate = new Date().toISOString();
const dateNoTime = fullDate.split("T")[0];
const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, "./productsImages/");
  },
  filename: function(request, file, callback) {
    const productNameNoSpaces = request.body.name.replace(/\s/g, "");
    const fileName = productNameNoSpaces + "_" + dateNoTime + ".jpg";
    request.body.imageName = fileName;

    callback(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 400 * 400
  }
});

module.exports = {
  upload
};
