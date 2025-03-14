import blog from "../models/Blog.js";

import {cloudinary }from "../utils/cloudinaryconfig.js"

export const createBlog=async(req,res)=>{
    try{
        if(!req.files|| !req.files.images || req.files.images.length ===0){
            return res.status(400).json({success:false,message:"No image uploaded"});
        }
            const result = await cloudinary.uploader.upload(req.files.images[0].path);
        
const{Title,Description,Date,}=req.body;

const images = result.secure_url;
const newBlog=new blog({Title,Description,Date,images});

await newBlog.save();

res.status(201).json({success:true,message:"blog created successfully",blog:newBlog});
    }catch(error){
    res.status(500).json({success:false,message:"server Error",error:error.message});
    

    }
}
export const getAllblog=async (req,res)=>{


    try{
const blogs= await blog.find();
res.status(200).json({success:true,blogs})
    }
    catch(error)
    {
  res.status(500).json({success:false,message:"server Error",error:error.message})
    }
}
export const getBlogById=async(req,res)=>{
    try{

    
const {id}=req.params;
const blog= await blog.findById(id);
    if(!blog)
    {return res.status(404).json({success:false,message:"blog not found"})}
    res.status(200).json({success:true,blog})
}
catch(error){
    res.status(500).json({success:false,message:"server Error",error:error.message})
}

}
export const deleteBlogById=async(req,res)=>{
    try{
        const{id}=req.params;
        const blog=blog.findByIdAndDelete(id);
        if(!blog)
            {return res.status(404).json({success:false,message:"blog not found"});
    }
        res.status(200).json({success:true,message:"blog deleted successfuly"});
    }
    catch(error){
        res.status(500).json({success:false,message:"server Error",error:error.message})
    }
        
    }