const mongoose = require("mongoose")
const slugify = require("slugify")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {timestamps: {createdAt: 'created_at'}})

// Create a unique slug based on title
PostSchema.pre("validate", function(next) {
    const post = this;
    if (post.title) {
        post.slug = slugify(post.title, { lower: true, strict: true });
    }
    next();
})

module.exports = mongoose.model("Post", PostSchema)
