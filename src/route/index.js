const router = require("express").Router();
const users = require("./usersRoute");
const auth = require("./authRoute");

router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
