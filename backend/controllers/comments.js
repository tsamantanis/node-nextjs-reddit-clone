const mongoose = require("mongoose")
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user');

const CommentController = {}

CommentController.newComment = async (req, res) => {
    if (req.user) {
        try {
            const comment = new Comment(req.body)
            comment.author = req.user._id
            const savedComment = await comment.save()
            const post = await Post.findById(req.params.postId)
            post.comments.unshift(savedComment)
            await post.save()
            const user = await User.findById(req.user._id)
            user.comments.unshift(savedComment)
            user.save()
            return res.json({ message: "Comment created successfully"})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    } else return res.status(401).json({message: "Unauthorized"})
}

module.exports = CommentController
