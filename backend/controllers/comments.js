const mongoose = require("mongoose")
const Comment = require('../models/comment')
const Post = require('../models/post')

const CommentController = {}

CommentController.newComment = async (req, res) => {
    try {
        const comment = new Comment(req.body)
        const savedComment = await comment.save()
        const post = await Post.findById(req.params.postId)
        post.comments.unshift(savedComment)
        await post.save()
        return res.json({ message: "Comment created successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = CommentController
