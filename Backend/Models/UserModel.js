const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    bio: { type: String, required: true},
    password: { type: String, required: true},
    created_at: { type: Date, required: true},
    updated_at: Date,
});

const UserModel = mongoose.model("users", userSchema);

module.exports = {
   UserModel
};

// { type: Date, default: Date.now }