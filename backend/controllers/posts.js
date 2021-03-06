const mongoose = require("mongoose")
const Post = require('../models/post')
const User = require('../models/user');
const PostController = {}

PostController.newPost = (req, res) => {
    if (req.user) {
        const post = new Post(req.body)
        post.author = req.user._id
        post.upVotes = []
        post.downVotes = []
        post.voteScore = 0
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

PostController.upvote = (req, res) => {
    if (req.user) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            post.save();
            return res.status(200).json({ voteScore: post.voteScore });
        });
    } else return res.status(401).json({message: "Unauthorized"})
}

PostController.downvote = (req, res) => {
    if (req.user) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            post.save();
            return res.status(200).json({ voteScore: post.voteScore });
        });
    } else return res.status(401).json({message: "Unauthorized"})
}

module.exports = PostController
