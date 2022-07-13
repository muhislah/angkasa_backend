const router = require("express").Router();
const {
  register,
  login,
  activation,
  refreshToken,
  getProfile,
  updateProfile,
  deleteUsers,
} = require("../controller/authController");
const { isTokenValid, isUser, isAdmin } = require("../middleware/auth");
const { protect } = require("../middleware/auth");
// const authValidation = require("../helper/validation/authValidation");
// const runValidation = require("../middleware/runValidation");
// const { isVerified } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
  // .post("/register", authValidation.register, runValidation, register)
  .post("/register", register)
  // .post("/login", authValidation.login, runValidation, login)
  .post("/login", login)
  .get("/active/:token", isTokenValid, activation)
  .post("/refresh-token", refreshToken)
  .get("/profile/users-detail", protect, isUser, isAdmin, getProfile)
  .put(
    "/profile/:id",
    protect,
    isUser,
    isAdmin,
    upload.single("photo"),
    updateProfile
  )
  .delete("/remove-users", protect, isAdmin, deleteUsers);

module.exports = router;
