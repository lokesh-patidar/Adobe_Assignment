const { LikeModel } = require("../Models/LikeCountModel");
const express = require("express");
const likeRouter = express.Router();
const jwt = require("jsonwebtoken");

// get likes
likeRouter.get("/", async (req, res) => {
    try {
        let countDetails = await LikeModel.find();
        res.send({ "count": countDetails.length });
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find counts!" });
    }
});

// pass person_id who is gonna to like
likeRouter.delete("/unlike/:id", async (req, res) => {
    const id = req.params.id;
    const item = await LikeModel.findOne({ "Person_id": id });
    console.log("item:", item);

    if (item) {
        try {
            await LikeModel.findByIdAndDelete({ "_id": item._id });
            res.send({ Message: "Count Deleted Successfully!" });
        }
        catch (error) {
            console.log(err);
            res.send({ Message: "Can not delete count!" });
        }
    }
    else {
        res.send({ Message: "You did not liked!" });
    }

});


// pass post id 
likeRouter.post("/like/:id", async (req, res) => {

    const id = req.params.id;
    console.log("id", id);

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);
    console.log("decoded", decoded);

    const isAlready_liked = await LikeModel.findOne({ "Person_id": decoded.userID }) || null;
    console.log("isAlready_liked:", isAlready_liked);

    if (decoded) {
        try {
            if (isAlready_liked === null) {
                const data = new LikeModel({ Person_id: decoded.userID, Post_id: id });
                await data.save();
                res.send({ Message: "Like count increases!" });
                console.log(data);
            }
            else {
                res.send({ Message: "Already liked!" });
            }
        }
        catch (err) {
            console.log(err);
            res.send({ Message: "like count increment failed!" });
        }
    }
    else {
        res.send({ Message: "Login first!" });
    }
});



module.exports = { likeRouter };