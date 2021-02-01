import mongoose from 'mongoose'
const Post = require('../models/post')

const PostController = {}

PostController.newPost = (req, res) => {
    const post = new Post(req.body)
    post.save((err, post) => {
        if (err) return res.status(500).json({ message: err.message })
        return res.status(200).json({ message: "Post created successfully"})
    })
}

module.exports = PostController
