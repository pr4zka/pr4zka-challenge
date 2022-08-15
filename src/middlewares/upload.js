const multer = require("multer");
const storage = require("../controllers/images");

const uploadMiddleware = multer({
  storage
});

module.exports = uploadMiddleware;
