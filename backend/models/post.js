const mongoose = require("mongoose")
const slugify = require("slugify")
const Schema = mongoose.Schema
const Populate = require("../util/autopopulate")

const PostSchema = new Schema({
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {timestamps: {createdAt: 'created_at'}})

// Create a unique slug based on title
PostSchema.pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre("validate", function(next) {
    const post = this;
    if (post.title) {
        post.slug = slugify(post.title, { lower: true, strict: true });
    }
    next();
})

module.exports = mongoose.model("Post", PostSchema)
