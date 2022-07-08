require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:3000' // client / frontend is using port 3000
}))


// app.use('/tiket', tiketRouter) 

app.listen(5000, () => {
    console.log('server running on port 5000')
})