require('dotenv/config')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

// db
require('./data/reddit-db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// routes
app.use(require('./routes'))

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
)

module.exports = app
