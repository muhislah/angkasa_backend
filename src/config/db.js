
const { Pool } = require('pg')

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
