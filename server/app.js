const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler=require("./controller/errorController.js")
const userRouter=require("./route/userRouter.js")
const AppError=require("./utils/appError")

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

//Users api urls
app.use('/api/v1/users',userRouter)

app.all('*',(req,res,next)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404))
})

app.use(globalErrorHandler)

module.exports = app;
