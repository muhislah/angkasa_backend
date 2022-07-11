const express = require("express");
const router = express.Router();
const airlines = require("./airlines");

router.use("/airlines", airlines);

module.exports = router;
