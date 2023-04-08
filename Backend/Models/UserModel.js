const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    created_at: Date,
    updated_at: Date,
});

const UserModel = mongoose.model("users", userSchema);

module.exports = {
   UserModel
};