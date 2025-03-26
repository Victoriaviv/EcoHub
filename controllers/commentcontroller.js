import Comment from "../models/Comment.js";
import mongoose from "mongoose";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;

    if (!blogId || !text) {
      return res.status(400).json({ success: false, message: "Blog ID and text are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    // Create a comment with only the blogId and text
    const newComment = new Comment({ blogId, text });
    await newComment.save();

    res.status(201).json({ success: true, message: "Comment added (awaiting approval)", comment: newComment });
  } catch (error) {
    console.error("Error in createComment:", error);  // Log error
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    const comments = await Comment.find({ blogId, status: "approved" }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
  }
};

// Delete a comment (Admin or Comment Owner only)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid comment ID" });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Check if the user is an admin or the owner of the comment (Modify `req.user.isAdmin` based on your auth logic)
    if (req.user?.isAdmin || String(comment.userId) === String(req.user?._id)) {
      await Comment.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Comment deleted" });
    }

    res.status(403).json({ success: false, message: "Not authorized to delete this comment" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
