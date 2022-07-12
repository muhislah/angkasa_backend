require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require("./src/route/authRoute");
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const mainRouter = require('./src/route/index');
const airlineRouter = require("./src/route/index");
const ticketRouter = require('./src/route/tiketRoute');
const { response } = require("./src/helper/response");


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use('/v1', mainRouter)
app.use('/logo', express.static(path.join(__dirname, './upload')))

app.use(cookieParser());

app.use("/auth", authRouter)
app.use(airlineRouter)
app.use('/ticket', ticketRouter)

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})

app.use((req, res) => {
  return response(res, [], 300, 'PAGE NOT FOUND')
})

app.listen(5000, () => {
  console.log('server running on port 5000')
})
