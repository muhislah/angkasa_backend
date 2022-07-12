require('dotenv').config()
const express = require('express')
const cors = require('cors')
const response = require('./src/helper/response')
const ticketRouter = require('./src/route/tiketRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/ticket', ticketRouter)

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    response(res, {}, 500, 'INTERNAL SERVER ERROR')
  }
})

app.use((req, res) => {
  return response(res, [], 300, 'PAGE NOT FOUND')
})

app.listen(5000, () => {
  console.log('server running on port 5000')
})