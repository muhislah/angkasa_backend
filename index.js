require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require("./src/route/authRoute");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // client / frontend is using port 3000
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);

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
