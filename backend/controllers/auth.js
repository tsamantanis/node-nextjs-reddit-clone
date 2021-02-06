const mongoose = require("mongoose")
const User = require('../models/user')

const UserController = {}

UserController.newUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.json({ message: "User created successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = UserController
