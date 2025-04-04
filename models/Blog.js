import mongoose from "mongoose";

const{model,Schema} = mongoose;

const blogSchema=new Schema(
    {
      userId:{ 
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true 
       },
     Title:{
        type:String,
        required:true
     },
     Description:{
        type:String,
        required:true
     },
     images:{
        type:Array,
        required:false
     }
    },
    {
timestamps:true
    },
)

const blog=model("blog" ,blogSchema)
export default blog;