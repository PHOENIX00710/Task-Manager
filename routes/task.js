import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { deleteTask, getAllMyTasks, newTask, updateCompletionOfTasks } from "../controllers/task.js";

const router=express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/myTasks",isAuthenticated,getAllMyTasks);
router
    .route("/:id")
    .put(isAuthenticated,updateCompletionOfTasks)
    .delete(isAuthenticated,deleteTask);

export default router;