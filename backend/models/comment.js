const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }
}, {timestamps: {createdAt: 'created_at'}})

module.exports = mongoose.model("Comment", CommentSchema)
