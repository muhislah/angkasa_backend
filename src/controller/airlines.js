const { v4: uuidv4 } = require('uuid')
const {create, update, deleteData, selectAirline, countAirline, detailAirline} = require('../model/airlines')
const createError = require('http-errors')
const cloudinary = require('../helper/cloudinary')
const { response :  responseHelper } = require('../helper/response')


const insertAirline = async (req, res, next) => {
    try {
        const { airlineName, pic, phoneNumber } = req.body
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
    const airlineId = req.params.airlineId
        const {airlineName, pic, phoneNumber, status, logo} = req.body
        const updatedAt = new Date()
        let photoCloud

        const { rows: [detail] } = await detailAirline(airlineId)
        const data = {
            airlineName,
            pic,
            logo,
            phoneNumber,
            status,
            airlineId,
            updatedAt
        }
    try {
        // Upload single ke Cloudinary
        if (req.file !== undefined) {
          photoCloud = req.file.path
    
          const url = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(photoCloud, { folder: 'upload' }, function (error, result) {
              if (result) {
                resolve(result.url)
              } else if (error) {
                reject(error)
              }
            })
          })
    
          data.logo = url
    
          // Delete IF there is Previous image
          if (detail.logo) {
            const prevPhoto = detail.logo
            let prevPhotoId = prevPhoto.split('/')
            prevPhotoId = prevPhotoId.slice(-1)
            prevPhotoId = prevPhotoId[0].split('.')
            prevPhotoId = prevPhotoId[0]
    
            const delResultPhoto = await new Promise((resolve, reject) => {
              cloudinary.uploader.destroy(`upload/${prevPhotoId}`, { resource_type: 'logo' }, function (error, result) {
                if (result) {
                  resolve(result)
                } else if (error) {
                  reject(error)
                }
              })
            })
            console.log(delResultPhoto)
          }
        } else {
          console.log('update profile without edit photo')
        }
    
        // console.log(data)
        // console.log(file)
        // console.log(detail.logo)
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