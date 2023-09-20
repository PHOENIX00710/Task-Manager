import mongoose, { mongo } from "mongoose";

const tasksSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now()),
    }

});

export const tasks=mongoose.model("tasks",tasksSchema);