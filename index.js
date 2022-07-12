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

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use('/v1', mainRouter)
app.use('/logo', express.static(path.join(__dirname, './upload')))

// app.use('/ticket', router)
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter)
app.use(airlineRouter)

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});


app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
