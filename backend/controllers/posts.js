const mongoose = require("mongoose")
const Post = require('../models/post')
const User = require('../models/user');
const PostController = {}

PostController.newPost = (req, res) => {
    if (req.user) {
        const post = new Post(req.body)
        post.author = req.user._id
        post.save().then(post => {
                return User.findById(req.user._id);
            }).then(user => {
                user.posts.unshift(post);
                user.save();
                // SHOULD REDIRECT TO THE NEW POST
                return res.json({ message: "Post created successfully"})
            }).catch(err => {
                return res.status(500).json({ message: err.message })
            });
    } else return res.status(401).json({message: "Unauthorized"})
}

PostController.allPosts = (req, res) => {
    Post.find({}).populate('comments author').lean().then(posts => {
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
