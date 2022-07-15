const express = require('express')
const { getAllTicket, addTicket, updateTicket, deleteTicket } = require('../controller/tiketController')
const router = express.Router()

router
  .get('/?', getAllTicket)
  .post('/', addTicket)
  .put('/:id', updateTicket)
  .delete('/:id', deleteTicket)

module.exports = router
