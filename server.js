import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./data/userData.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";


dotenv.config({
    path:'./data/config.env',
})
const app=express();

connectDB();
app.use(express.json());
app.use(cookieParser());

//Using middlewares for routes alogn eith syntax specifying we are making a call to the version1 on an API
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is listening");
})