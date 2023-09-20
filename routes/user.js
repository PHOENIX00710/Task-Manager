import express from "express";
import { getDetails, login, logout, newUser, onLoading } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";


const router=express.Router();

router.get("/",onLoading);
router.post("/login",login);
router.post("/register",newUser);
router.get("/myDetails",isAuthenticated, getDetails);
router.get("/logout",logout);

export default router;