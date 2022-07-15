const express = require("express");
const router = express.Router();
const {
  insertAirline,
  updateAirline,
  deleteAirline,
  getAirlines,
  getAirlineByStatus
} = require("../controller/airlines");
const upload = require("../middleware/upload");

router
  .post("/", upload.single("logo"), insertAirline)
  .put("/:airlineId", upload.single("logo"), updateAirline)
  .delete("/:airlineId", deleteAirline)
  .get("/", getAirlines)
  .get("/:status", getAirlineByStatus)

module.exports = router;