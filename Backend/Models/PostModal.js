const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // (foreign key referencing the User model)
    content: { type: String, required: true }, // (string, 1-300 characters)
    created_at: { type: Date, required: true }, // (timestamp, automatically set when the post is created)
    updated_at: { type: Date }, // (timestamp, automatically updated when the post is updated)
    likes: { type: Number, required: true }, // (integer, non-negative)
});

const PostModel = mongoose.model("posts", postSchema);

module.exports = {
    PostModel
};