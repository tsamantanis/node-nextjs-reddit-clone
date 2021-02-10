require('dotenv/config')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

// db
require('./data/reddit-db')

const app = express()

const checkAuth = (req, res, next) => {
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkAuth)
// routes
app.use(require('./routes'))

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
)

module.exports = app
