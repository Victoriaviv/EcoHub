import express from "express";
import { createComment, getCommentsByBlogId, deleteComment } from "../controllers/commentcontroller.js";

const router = express.Router();

router.post("/createComment", createComment);
router.get("/getCommentsByBlogId/:blogId", getCommentsByBlogId);
router.delete("/deleteComment/:id", deleteComment);

export default router;
