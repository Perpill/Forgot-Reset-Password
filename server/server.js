<<<<<<< HEAD
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const database = process.env.DB_URI;

//DB connection
mongoose
  .connect(database)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
=======
import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './route/authRoutes.js'
import userRouter from "./route/userRoutes.js";

const app=express();
const port = 3000;
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))

//API Endpoints
app.get('/', (req,res)=> res.send("API working"))
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
>>>>>>> 0d33f49 (backend)
});
