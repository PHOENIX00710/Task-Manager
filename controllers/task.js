import { tasks } from "../models/taskDatabase.js";

export const newTask=async(req,res)=>{
    const {title,description}=req.body;
    let userID=req.user;

    await tasks.create({
        title,
        description,
        user:userID,
    })

    res.status(201).json({
        success:true,
        message:"New Task Added!!",
    })
}

export const getAllMyTasks=async(req,res)=>{
    const userID=req.user._id;
    let userTasks=await tasks.find({user:userID});
    if(!userTasks)
        return res.status(201).json({success:true,message:"No tasks"});
    res.status(201).json({
        success:true,
        userTasks
    });
};

export const updateCompletionOfTasks=async(req,res)=>{
    const taskid=req.params.id;
    if(!taskid)
        return res.status(201).json({success:true,message:"Task not found!!"});
    let task=await tasks.findById(taskid);
    if(!task)
        return res.status(201).json({success:true,message:"Task not found!!"});
    console.log(task.isCompleted);
    task.isCompleted = !task.isCompleted;
    //Remember to save the changes in put and delete and always put await before mongoose functions
    await task.save();
    console.log(task.isCompleted);
    res.status(201).json({
        success:true,
        message:"Task status updated",
    });
};

export const deleteTask=async(req,res)=>{
    const taskid=req.params.id;
    if(!taskid)
        return res.status(201).json({success:true,message:"Task not found!!"});
    let task=await tasks.findById(taskid);
    if(!task)
        return res.status(201).json({success:true,message:"Task not found!!"});
    task.deleteOne();
    //Remember to save the changes in put and delete
    task.save();
    res.status(201).json({
        success:true,
        message:"Task deleted",
    });
};