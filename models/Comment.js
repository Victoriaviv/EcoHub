import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Blog", 
      required: true 
    },
    text: { 
      type: String, 
      required: true 
    },
    // Other fields like userId, name, email can be optional if you're not sending them
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
