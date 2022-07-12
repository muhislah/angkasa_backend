
const { Pool } = require('pg')


const pool = new Pool({
  connectionString : `postgres://pslvlloebbtgtd:ac79a695c160528d63ece956597b2037b68838fef7b8dc0bc85ff5f519ad9a74@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d58t23tntj4edt`,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  ssl: { rejectUnauthorized : false }
})

pool.connect((error) => {
  if (error) {
    console.log("there is error: ", error)
  } else {
    console.log(`connected to database : ${process.env.DB_NAME}`)
  }
});

module.exports = pool
