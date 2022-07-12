const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOption = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOption);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOption = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOption);
  return token;
};

module.exports = {
  generateToken,
  generateRefreshToken,
};
