const createHttpError = require("http-errors")
const { response } = require("../helper/response")
const { getAllTicket, addTicket, updateTicket, deleteTicket, getTicketbyFilter, countData } = require("../model/tiketModel")
const { v4: uuid } = require('uuid')

// just empty file
module.exports.getAllTicket = async (req, res, next) => {
  try {
    const orderby = req.query.sortby || "id"
    const order = req.query.sort || "ASC"
    const limit = +req.query.limit || 5
    const page = +req.query.page || 1
    const offset = (page - 1) * limit

    const query = req.query

    const { rows: [{ total }] } = await countData(query)
    const { rows } = await getAllTicket({...query, order, orderby, limit, offset})
    const pagination = {
      totalData: +total,
      totalPage: Math.ceil(total / limit),
      page: page,
      limit: limit
    }
    response(res, rows , 200, 'GET ALL TICKET SUCCESS', pagination)
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

// module.exports.getTicketbyFilter = async (req, res, next) => {
//   try {
//     const query = req.query
//     const { rows } = await getTicketbyFilter(query)
//     console.log(query)
//     if (!rows) {
//       return response(res, [], 200, 'NO DATA FOUND')
//     }
//     response(res, rows, 200, 'GET ALL TICKET SUCCESS BY FILTER')
//   } catch (error) {
//     console.log(error)
//     next(createHttpError.InternalServerError())
//   }
// }

module.exports.addTicket = async (req, res, next) => {
  try {
    const id = uuid()
    const body = req.body
    body.id = id
    const { rowCount } = await addTicket(body)
    if (!rowCount) {
      return response(res, [], 300, 'INSERT FAILED')
    }
    response(res, body, 200, 'INSERT SUCCESS')
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateTicket = async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    body.id = id
    const { rowCount } = await updateTicket(body)
    if (!rowCount) {
      return response(res, [], 300, 'UPDATE FAILED')
    }
    response(res, body, 200, 'UPDATE SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.deleteTicket = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteTicket(id)
    if (!rowCount) {
      return response(res, [], 300, 'DELETE FAILED')
    }
    response(res, {}, 200, 'DELETE SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}
