const router = require('express').Router()
const {
    newUser
} = require('../controllers/auth')

router.post("/sign-up", newUser)

module.exports = router
