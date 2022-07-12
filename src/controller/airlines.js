const { v4: uuidv4 } = require('uuid')
const {create, update, deleteData, selectAirline, countAirline} = require('../model/airlines')
const createError = require('http-errors')
const cloudinary = require('../helper/cloudinary')
const responseHelper = require('../helper/response')


const insertAirline = async (req, res, next) => {
    try {
        const {airlineName, pic, phoneNumber} = req.body
        const image = req.file.path
        const ress = await cloudinary.uploader.upload(image)
        const data = {
            airlineId: uuidv4(),
            airlineName,
            logo: ress.url,
            pic,
            phoneNumber,
        }
        await create(data)
        responseHelper(res, data, 201, 'insert data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const updateAirline = async (req, res, next) => {
    try {
        const airlineId = req.params.airlineId
        const {airlineName, pic, phoneNumber, status} = req.body
        const img = req.file.path
        const ress = await cloudinary.uploader.upload(img)
        const updatedAt = new Date()

        const data = {
            airlineName,
            pic,
            logo: ress.url,
            phoneNumber,
            status,
            airlineId,
            updatedAt
        }
        await update(data)
        responseHelper(res, data, 200, 'update data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const deleteAirline = async (req, res, next) => {
    try {
        const airlineId = req.params.airlineId

        await deleteData(airlineId)
        responseHelper(res, airlineId, 200, 'delete data success')
    } catch (error) {
        console.log(error)
        next(new createError.InternalServerError())
    }
}

const getAirlines = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5
        const page = parseInt(req.query.page) || 1
        const offset = (page - 1) * limit
    
        const sortby = req.query.sortby || 'airlineId'
        const sort = req.query.sort || 'asc'
    
        const search = req.query.search || ''
        const searchby = req.query.searchby || 'airlineName'
    
        const result = await selectAirline({ limit, offset, sortby, sort, search, searchby })
    
        const { rows: [count] } = await countAirline()
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

module.exports = {
    insertAirline,
    updateAirline,
    deleteAirline,
    getAirlines
}