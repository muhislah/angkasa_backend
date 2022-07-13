const express = require("express");
const router = express.Router();
const {insertOrder, updateOrder, deleteOrder, getOrder, getDetailOrder, getDetailByUser} = require('../controller/orderedTicket')

router
    .post('/', insertOrder)
    .put('/:orderId', updateOrder)
    .delete('/:orderId', deleteOrder)
    .get('/', getOrder)
    .get('/:orderId', getDetailOrder)
    .get('/:userId', getDetailByUser)

module.exports = router