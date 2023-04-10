import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

const app = express();
app.use(express.static('public'))
app.use('/images', express.static("images"))
dotenv.config();

mongoose.set("strictQuery", false);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())


app.get("/", (req,res) => {
  res.send("Welcome to adobe app!");
});

app.use('/', AuthRoute)
app.use('/', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => app.listen(process.env.PORT, () => console.log("started"))).catch((error) => console.log(error));
