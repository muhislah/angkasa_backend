<<<<<<< HEAD
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

module.exports = pool
=======
const { Pool } = require("pg");
const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
connection.connect((error) => {
  if (error) {
    console.log("Database connection error: ", error);
  } else {
    console.log(`Database connection success : ${process.env.DB_NAME}`);
  }
});

module.exports = connection;
>>>>>>> 565a5ed49838af13bc5ae5570dec0f3e5e355164
