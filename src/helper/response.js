const response = (res, result, status, message, pagination, search) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    if (pagination)resultPrint.pagination = pagination
    if (search)resultPrint.search_key = search
    res.status(status).json(resultPrint)
  }
  
  module.exports = response