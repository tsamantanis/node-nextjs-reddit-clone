const mongoose = require("mongoose")
const Post = require('../models/post')

const PostController = {}

PostController.newPost = (req, res) => {
    const post = new Post(req.body)
    post.save((err, post) => {
        if (err) return res.status(500).json({ message: err.message })
        return res.json({ message: "Post created successfully"})
    })
}

PostController.allPosts = (req, res) => {
    Post.find({}).populate('comments').lean().then(posts => {
        res.status(200).json({ posts });
    }).catch(err => {
        console.log(err.message);
    })
}

PostController.postBySlug = (req, res) => {
    Post.findOne({slug: req.params.slug}).populate('comments').lean().then(post => {
        res.status(200).json({ post });
    }).catch(err => {
        console.log(err.message);
    })
}

PostController.postsBySub = (req, res) => {
    Post.find({subreddit: req.params.sub, slug: req.params.slug}).populate('comments').lean().then(posts => {
        res.status(200).json({ posts });
    }).catch(err => {
        console.log(err.message);
    })
}


module.exports = PostController
