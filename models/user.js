import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now()),
    }
});

export const User=mongoose.model("Users",userSchema);