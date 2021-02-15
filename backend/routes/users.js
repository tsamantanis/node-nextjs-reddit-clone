const router = require('express').Router()
const {
    newUser,
    login,
    logout
} = require('../controllers/auth')

router.post("/sign-up", newUser)
router.post("/login", login)
router.get("/logout", logout)

module.exports = router
