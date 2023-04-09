const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    Person_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    Post_id: { type: mongoose.Schema.Types.ObjectId, required: true},
});

const LikeModel = mongoose.model("likes", likeSchema);

module.exports = {
    LikeModel
};