const jwt = require("jsonwebtoken");
require('dotenv').config();

const PostValidation = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);

    if (req.method === "POST" && decoded) {
        req.body.user_id = decoded.userID;
        console.log("req.body.user_id", req.body.user_id);
        next();
    } 
    else {
        next();
    }
};

module.exports = { PostValidation };

// && req.url === "/posts"