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

UserController.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username }, "username password")
        if (!user) return res.status(401).send({ message: "Wrong Username or Password" });
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) return res.status(401).send({ message: "Wrong Username or password" });
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                expiresIn: "60 days"
            });
            return res.json({ message: "User login successful", authToken: jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" })})
        });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = UserController
