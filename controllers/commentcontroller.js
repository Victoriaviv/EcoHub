import Comment from "../models/Comment.js";
import mongoose from "mongoose";

// Create a comment
export const createComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).json({ success: false, message: "Invalid blog ID" });

    const newComment = new Comment({ blogId, text });
    await newComment.save();
    res.status(201).json({ success: true, message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get comments for a specific blog (only approved comments)
export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId, status: "approved" });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching comments" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
