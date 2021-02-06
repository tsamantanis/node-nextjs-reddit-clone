const mongoose = require("mongoose")
const Comment = require('../models/comment')

const CommentController = {}

CommentController.newComment = (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, comment) => {
        if (err) return res.status(500).json({ message: err.message })
        return res.json({ message: "Comment created successfully"})
    })
}

module.exports = CommentController
