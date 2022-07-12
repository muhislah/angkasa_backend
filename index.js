require('dotenv').config()
const express = require('express')
const cors = require('cors')

const router = require('./src/route/tiketRoute')
const helmet = require('helmet')
const CreateError = require('http-errors')
const morgan = require('morgan')
const path = require('path')
const mainRouter = require('./src/route/index')

const app = express()

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:3000' // client / frontend is using port 3000
}))
app.use(morgan('dev'))
app.use(helmet())
app.use('/v1', mainRouter)
app.use('/logo', express.static(path.join(__dirname, './upload')))

app.use('/ticket', router)

// app.use('/tiket', tiketRouter) 

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})
app.all('*', (req, res, next) => {
  next(new CreateError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})