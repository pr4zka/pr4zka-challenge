const multer = require("multer");

//lugar donde se guardan las imagenes
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

//configuracion del multer
const uplaod = multer({ storage });

module.exports = {
  uplaod,
};
