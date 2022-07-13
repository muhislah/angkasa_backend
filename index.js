require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const mainRouter = require("./src/route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // client / frontend is using port 3000
  })
);
app.use(morgan("dev"));
// app.use(bodyParser.json());
app.use(mainRouter);
app.use("/img", express.static(path.join(__dirname, "./upload")));

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "Internal Server Error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messError,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
