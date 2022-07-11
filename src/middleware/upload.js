const multer = require("multer");
const createHttpError = require("http-errors");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(file.originalname.toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    return cb(createHttpError("File extension must be PNG or JPG"), false);
  }
  const limits = parseInt(req.headers["content-length"]);
  if (limits > 30 * 1000 * 1000) {
    cb(createHttpError("sorry data max 2 Mb"));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
