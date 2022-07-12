const express = require("express");
const router = express.Router();
const {insertOrder, updateOrder, deleteOrder, getOrder, getDetailOrder} = require('../controller/orderedTicket')

router
    .post('/', insertOrder)
    .put('/:orderId', updateOrder)
    .delete('/:orderId', deleteOrder)
    .get('/', getOrder)
    .get('/:orderId', getDetailOrder)

module.exports = router