const router = require("express").Router();
const {
  register,
  login,
  activation,
  refreshToken,
} = require("../controller/authController");
// const { protect } = require("../middleware/auth");

router
  .post("/register", register)
  .post("/login", login)
  .get("/active/:token", activation)
  .post("/refresh-token", refreshToken);

module.exports = router;
