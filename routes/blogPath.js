import { createBlog,getAllblog,getBlogById,deleteBlogById} from "../controllers/blogcontroller.js";
import configureMulter from "../utils/multer.js";
import express from 'express';
import { admin } from "../middlewares/roleIdentification.js";
import {auth} from "../middlewares/tokenVerification.js"


const blogRouter=express();

const upload = configureMulter();

blogRouter.post("/createBlog",upload,createBlog);
blogRouter.get("/getAllblog",getAllblog);
blogRouter.get("/getBlogById/:id",getBlogById);
blogRouter.delete("/deleteBlogById/:id",deleteBlogById)
export default blogRouter;