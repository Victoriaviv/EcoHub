import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
export const auth = async (req, res, next) => {
  const token = await req.headers?.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Access denied, invalid token format" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ message: "User not found or token expired" });
    }

    console.log("Decoded JWT:", decoded , user);

    req.user = user; 
    req.token = token;
    req.user.userRole = decoded.userRole;
    next(); 
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};