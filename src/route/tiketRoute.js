const express = require('express')
const { getTicket } = require('../controller/tiketcontroller')
const router = express.Router()


router
  .get('/', getTicket)

module.exports = router