import express from "express"

import userRouter from "./userPath.js";
import blogRouter from "./blogPath.js";


const mainRouter=express.Router();

mainRouter.use("/user",userRouter);
mainRouter.use("/blog",blogRouter)
export default mainRouter;