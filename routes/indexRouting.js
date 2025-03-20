import express from "express"

import userRouter from "./userPath.js";
import blogRouter from "./blogPath.js";
import commentRouter from "./commentPath.js";
import ContactRouter from "./contactPath.js";


const mainRouter=express.Router();

mainRouter.use("/user",userRouter);
mainRouter.use("/blog",blogRouter);
mainRouter.use("/comment",commentRouter);
mainRouter.use("/contact",ContactRouter);

export default mainRouter;