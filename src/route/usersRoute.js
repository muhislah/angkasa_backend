const router = require("express").Router();
const { getUsers, getUsersById } = require("../controller/usersController");
const { protect, isAdmin } = require("../middleware/auth");

router
  // USERS ADMIN
  .get("/", protect, isAdmin, getUsers)
  .get("/:id", protect, isAdmin, getUsersById);

module.exports = router;
