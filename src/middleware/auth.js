const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.decoded = decoded;
      next();
    } else {
      next(createError(400, "server need token, please login!"));
    }
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      next(createError(400, "token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createError(400, "token expired, please login!"));
    } else {
      next(createError(400, "Token not active, please login!"));
    }
  }
};

const isTokenValid = (req, res, next) => {
  try {
    let token;
    if (req.params.token) {
      token = req.params.token;

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.decoded = decoded;
      next();
    } else {
      next(createError(400, "server need token, please login!"));
    }
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      next(createError(400, "token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createError(400, "token expired, please login!"));
    } else {
      next(createError(400, "Token not active, please login!"));
    }
  }
};

const isUser = (req, res, next) => {
  if (req.decoded.role !== 2) {
    console.log(req.decoded.role);
    return next(createError(400, "user only"));
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.decoded.role !== 1) {
    console.log(req.decoded.role);
    return next(createError(400, "admin only"));
  }
  next();
};

module.exports = {
  protect,
  isTokenValid,
  isUser,
  isAdmin,
};
