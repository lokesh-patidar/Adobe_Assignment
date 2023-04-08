const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    created_at: Date,
    updated_at: Date,
});

const PostModel = mongoose.model("posts", postSchema);

module.exports = {
    PostModel
};