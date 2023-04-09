const { PostModel } = require("../Models/PostModal");
const express = require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
    try {
        let data = await PostModel.find();
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find posts!" });
    }
});


postRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await PostModel.findByIdAndDelete({ "_id": id });
        res.send({ Message: "Post Deleted Successfully!" });
    }
    catch (error) {
        console.log(err);
        res.send({ Message: "Can not delete post!" });
    }
});


postRouter.put("/:id", async (req, res) => {

    const id = req.params.id;
    const { user_id, content, created_at, likes } = req.body;

    try {
        await PostModel.findByIdAndUpdate({ "_id": id }, { user_id, content, created_at, likes, updated_at: new Date() });
        res.send({ Message: "Post Updated!" });
    }
    catch (error) {
        console.log(err);
        res.send({ Message: "Can not update post!" });
    }
});


// get by ID
postRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const postById = await PostModel.findById({ "_id": id });
        res.send(postById);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can't find post by given id!" });
    }
});


postRouter.post("/", async (req, res) => {

    const { content } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);
    console.log("decoded", decoded);

    try {
        if (decoded) {
            const data = new PostModel({ user_id: decoded.userID, content, created_at: new Date(), likes: 0 });
            await data.save();
            console.log(data);
            res.send({ Message: "Post posted successfully!" });
        }
        else {
            res.send({ Message: "Something went wrong!" });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Post posting filed!" });
    }
});


module.exports = { postRouter };