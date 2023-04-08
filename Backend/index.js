const express = require("express");
const cors = require("cors");
const { connection } = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get("/", (req,res) => {
    res.send({Message: "Welcome to Adobe Social Media!"})
});

app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log("Connected to the database");
    }
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
    console.log(`Server is running...`);
})