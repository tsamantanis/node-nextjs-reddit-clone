const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const UserController = {}

UserController.newUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.json({ message: "User created successfully", authToken: jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" })})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = UserController
