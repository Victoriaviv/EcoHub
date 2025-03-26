import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Blog", 
      required: true 
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false 
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: false 
    },
    text: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    },
    likes: { 
      type: Number, 
      default: 0 
    },
    dislikes: { 
      type: Number, 
      default: 0 
    },
    parentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Comment",
      default: null 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
