import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated=async(req,res,next)=>{
    const userToken = req.cookies.token;
    if (!userToken) {
        return res.status(404).json({
            success: false,
            message: "Login First!"
        })
    }
    let userID=jwt.verify(userToken,process.env.JWT_STRING);
    let user = await User.findById(userID);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User Not Found",
        })
    }
    req.user=user;
    // Use of next it basically calls the next function lined up for execution
    next();
}