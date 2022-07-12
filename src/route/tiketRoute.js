const express = require('express')
const { getAllTicket, getTicketbyFilter, addTicket, updateTicket, deleteTicket } = require('../controller/tiketcontroller')
const router = express.Router()

router
  .get('/', getAllTicket)
  .get('/search', getTicketbyFilter)
  .post('/', addTicket)
  .put('/:id', updateTicket)
  .delete('/:id', deleteTicket)

module.exports = router