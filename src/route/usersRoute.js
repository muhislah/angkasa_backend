const router = require("express").Router();
const {
  getUsers,
  getUsersById,
  updUserStatus,
} = require("../controller/usersController");
const { protect, isAdmin } = require("../middleware/auth");

router
  // USERS ADMIN
  .get("/", protect, isAdmin, getUsers)
  .get("/:id", protect, isAdmin, getUsersById)
  .put("/update/user-status", protect, isAdmin, updUserStatus);

module.exports = router;
