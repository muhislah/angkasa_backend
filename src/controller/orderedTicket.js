const { v4: uuidv4 } = require('uuid')
const {create, update, deleteData, selectOrder, countOrder, detailOrder, detailByUser} = require('../model/orderedTicket')
const createError = require('http-errors')
const { response :  responseHelper } = require('../helper/response')


const insertOrder = async (req, res, next) => {
    try {
        const {passengerTitle, passengerName, nationality, userId, airlineId, ticketId} = req.body
        const data = {
            orderId: uuidv4(),
            passengerTitle,
            passengerName,
            nationality,
            userId,
            airlineId,
            ticketId,
        }
        await create(data)
        responseHelper(res, data, 201, 'insert data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const {passengerTitle, passengerName, nationality, userId, airlineId, ticketId, status} = req.body
        const updatedAt = new Date()

        const data = {
            passengerTitle,
            passengerName,
            nationality,
            userId,
            airlineId,
            ticketId,
            status,
            updatedAt,
            orderId,
        }
        await update(data)
        responseHelper(res, data, 200, 'update data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        await deleteData(orderId)
        responseHelper(res, orderId, 200, 'delete data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const getOrder = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5
        const page = parseInt(req.query.page) || 1
        const offset = (page - 1) * limit
    
        const sortby = req.query.sortby || 'orderId'
        const sort = req.query.sort || 'asc'
    
        const search = req.query.search || ''
        const searchby = req.query.searchby || 'orderId'
    
        const result = await selectOrder({ limit, offset, sortby, sort, search, searchby })
    
        const { rows: [count] } = await countOrder()
        const totalData = parseInt(count.total)
        const totalPage = Math.ceil(totalData / limit)
    
        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage,
        }
    
        responseHelper(res, result, 200, 'Get data success', pagination)
      } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
      }
}

const getDetailOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const result = await detailOrder(orderId)
        responseHelper(res, result, 200, 'get detail success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const getDetailByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const result = await detaiByUser(userId)
        responseHelper(res, result, 200, 'get detail success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}
module.exports = {
    insertOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getDetailOrder,
    getDetailByUser
}