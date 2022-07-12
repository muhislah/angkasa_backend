const router = require("express").Router();
const {
  getUsers,
  getUsersById,
  //   updateUsers,
  deleteUsers,
  profile,
  updateProfile,
} = require("../controller/usersController");
const upload = require("../middleware/upload");
const { protect, isAdmin, isCustommer } = require("../middleware/auth");

router
  // USERS ADMIN
  .get("/", getUsers)
  .get("/:id", getUsersById)
  //   .put("/:id", upload.single("photo"), updateUsers)
  // .put("/:id/photo", updatePhoto)
  .delete("/:id", protect, isAdmin, deleteUsers)

  //   PROFILE Custumer
  .get("/:id", protect, profile)
  .put("/:id", protect, upload.single("photo"), updateProfile);

module.exports = router;
