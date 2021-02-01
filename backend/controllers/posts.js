import mongoose from 'mongoose'

const PostController = {}

PostController.newPost = (req, res) => {
    console.log(req.body)
}

module.exports = PostController
