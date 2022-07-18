const express = require("express");
const router = express.Router();
const orderedTicket = require('./orderedTicket')

router
    .use("/ordered-ticket", orderedTicket)

module.exports = router;
