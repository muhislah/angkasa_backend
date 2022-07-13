require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const authRouter = require("./src/route/authRoute");
const helmet = require('helmet')
const morgan = require('morgan')
const ticketRouter = require('./src/route/tiketRoute');
const { response } = require("./src/helper/response");
const airlinesRouter = require("./src/route/airlines");
const orderTicketRouter = require("./src/route/orderedTicket");
const usersRouter = require("./src/route/usersRoute");


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use('/logo', express.static(path.join(__dirname, './upload')))


app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use('/ticket', ticketRouter)
app.use('/airlines', airlinesRouter)
app.use('/orderticket', orderTicketRouter)

app.use(express.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "./upload")));

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

app.listen(process.env.PORT || 5000, () => {
  console.log('server running on port ' + process.env.PORT)
})
