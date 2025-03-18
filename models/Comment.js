import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
