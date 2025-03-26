import express from "express";
import { 
  createComment, 
  getCommentsByBlogId, 
  deleteComment, 
  
} from "../controllers/commentcontroller.js";

const router = express.Router();

// Create a new comment
router.post("/createComment", createComment);

// Get all comments for a specific blog post
router.get("/getCommentsByBlogId/:blogId", getCommentsByBlogId);

// Delete a comment (admin only)
router.delete("/deleteComment/:id", deleteComment);


export default router;
