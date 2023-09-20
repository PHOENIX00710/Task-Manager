import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./data/userData.js";
import router from "./routes/user.js";
import cookieParser from "cookie-parser";


dotenv.config({
    path:'./data/config.env',
})
const app=express();

connectDB();
app.use(express.json());
app.use(cookieParser());

//Using middlewares for routes
app.use("/user",router);

app.listen(process.env.PORT,()=>{
    console.log("Server is listening");
})