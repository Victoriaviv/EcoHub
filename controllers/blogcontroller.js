import Blog from "../models/Blog.js";
import { cloudinary } from "../utils/cloudinaryconfig.js";


export const createBlog = async (req, res) => {
    try {
        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        const result = await cloudinary.uploader.upload(req.files.images[0].path);
        const { Title, Description} = req.body;

        const images = result.secure_url;
        const newBlog = new Blog({ Title, Description, images ,userId:req.user?._id});

        await newBlog.save();

        res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const getAllblog = async (req, res) => {
    
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const getBlogById = async (req, res) => {
    



 


    
};


export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};