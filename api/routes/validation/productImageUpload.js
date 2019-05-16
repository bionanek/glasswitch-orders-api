const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, "./productsImages/");
  },
  filename: function(request, file, callback) {
    callback(
      null,
      request.body.name + Date.now().toString() + file.originalname
    );
  }
});

const fileFilter = (request, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage
});

module.exports = {
  upload
};
