const multer = require("multer");

const dateNoTime = new Date().toISOString().split("T")[0];

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, "./productsImages/");
  },
  filename: function(request, file, callback) {
    const fileName = request.body.code + "_" + dateNoTime + ".jpg";
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
