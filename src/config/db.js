// just empty file
const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((error) => {
  if (error) {
    console.log("there is error: ", error)
  } else {
    console.log(`connected to database : ${process.env.DB_NAME}`)
  }
});

module.exports = pool