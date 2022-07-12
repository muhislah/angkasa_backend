const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1 day",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT2, verifyOpts);
  return token;
};
module.exports = {
  generateToken,
  generateRefreshToken,
};
