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

PostController.allPosts = (req, res) => {
    Post.find({}).lean().then(posts => {
        res.status(200).json({ posts });
    }).catch(err => {
        console.log(err.message);
    })
}

module.exports = PostController
