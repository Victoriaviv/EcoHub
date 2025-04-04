import express from "express";
import{getmyprofile, Login,Register}from "../controllers/usercontroller.js";
import { auth } from "../middlewares/tokenVerification.js";

const userRouter=express.Router();
userRouter.post("/login",Login);
userRouter.post("/register",Register);
userRouter.get('/profile',auth, getmyprofile);


export default userRouter;