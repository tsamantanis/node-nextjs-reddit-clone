const router = require('express').Router()
const {
    newUser,
    login
} = require('../controllers/auth')

router.post("/sign-up", newUser)
router.post("/login", login)

module.exports = router
