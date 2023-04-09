const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/User.Route");
const { postRouter } = require("./Routes/Post.Route");
const { likeRouter } = require("./Routes/Like.Route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get("/", (req, res) => {
    res.send({ Message: "Welcome to Adobe Social Media!" })
});

app.use("/", userRouter);
app.use("/posts", postRouter);
app.use("/post", likeRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the database");
        console.log(`Server is running...`);
    }
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
});