const createHttpError = require("http-errors")
const response = require("../helper/response")
const { getAllTicket, addTicket, updateTicket, deleteTicket } = require("../model/tiketmodel")
const { v4 : uuid } = require('uuid')

// just empty file
module.exports.getAllTicket = async (req,res,next) => {
  try {
    const { rows } = await getAllTicket()
    response(res, rows , 200, 'GET ALL TICKET SUCCESS')
  } catch (error) {
    next(createHttpError.InternalServerError()) 
  }
}

module.exports.getTicketbyFilter = async (req,res,next) => {

}

module.exports.addTicket = async (req,res,next) => {
  try {
    const id = uuid()
    const body = req.body
    body.id = id
    const { rowCount } = await addTicket(body)
    if(!rowCount) {
      return response(res, [] , 300, 'INSERT FAILED')
    }
    response(res, body , 200, 'INSERT SUCCESS')
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateTicket = async(req,res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    body.id = id
    const { rowCount } = await updateTicket(body)
    if(!rowCount) {
      return response(res, [] , 300, 'UPDATE FAILED')
    }
    response(res, body , 200, 'UPDATE SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.deleteTicket = async (req,res,next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteTicket(id)
    if(!rowCount) {
      return response(res, [] , 300, 'DELETE FAILED')
    }
    response(res, {} , 200, 'DELETE SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}
