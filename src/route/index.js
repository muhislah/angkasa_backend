const express = require("express");
const router = express.Router();
const airlines = require("./airlines");
const orderedTicket = require('./orderedTicket')

router
    .use("/airlines", airlines)
    .use("/ordered-ticket", orderedTicket)

module.exports = router;
