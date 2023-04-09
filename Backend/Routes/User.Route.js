const { UserModel } = require("../Models/UserModel");
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthValidator } = require("../Middlewares/AuthValidation.middleware");
require('dotenv').config();


userRouter.get("/users", async (req, res) => {
    try {
        let allUser = await UserModel.find();
        res.send(allUser);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find users!" });
    }
});

userRouter.post("/users", async (req, res) => {
    const { name, email, bio, password } = req.body;
    const isAlready = await UserModel.findOne({ "email": email }) || null;

    console.log("isAlready:", isAlready);

    try {
        if (isAlready === null || isAlready.email !== email) {
            bcrypt.hash(password, 4, async (err, hash) => {
                if (err) {
                    console.log("error", err);
                    res.send("Err");
                }
                else {
                    let user = new UserModel({ name, email, bio, password: hash, created_at: new Date() });
                    await user.save();
                    console.log(user);
                    res.send({ Message: "User Registered Successfully!" });
                }
            });
        }
        else {
            res.send({ Message: "User already registered!" });
        }
    }
    catch (err) {
        res.send({ Message: "User Registration Failed!" });
        console.log(err);
    }
});


userRouter.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            console.log(user);
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.key);
                    res.send({
                        Message: "User Login Successfull!",
                        token,
                        user
                    });
                }
                else {
                    res.send({ Message: "Wrong user credential!" });
                }
            });
        }
        else {
            res.send({ Message: "Wrong credential!" });
        }
    }
    catch (err) {
        res.send({ Message: "Usen can not login!" });
        console.log(err);
    }
});


userRouter.use(AuthValidator);

userRouter.get("/analytics/users", async (req, res) => {
    try {
        let data = await UserModel.find();
        console.log("analytics", data.length);
        res.send({ total_users: data.length });
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find users!" });
    }
});


userRouter.get("/analytics/users/top-active", async (req, res) => {
    try {
        let data = await UserModel.find();
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find users!" });
    }
});


userRouter.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete({ "_id": id });
        res.send({ Message: "User Deleted!" });
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not delete user!" });
    }
});


userRouter.put("/users/:id", async (req, res) => {

    const { name, email, bio, password, created_at } = req.body;
    const id = req.params.id;

    try {
        await UserModel.findByIdAndUpdate({ "_id": id }, { name, email, bio, password, created_at, updated_at: new Date() });
        res.send({ Message: "User Updated!" });
    }
    catch (error) {
        console.log(err);
        res.send({ Message: "Can not update user info!" });
    }
});


// get by ID
userRouter.get("/users/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const user = await UserModel.findById({ "_id": id });
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can't find product item by given id!" });
    }
});


module.exports = { userRouter };