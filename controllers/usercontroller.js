import  User from "../models/user.js";
import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/tokenGenerating.js";

export const Register = async (req, res) => {
    try {
        const { firstName, lastName, userEmail, userPassword, userRole  } = req.body;

        if (!userPassword) {
            return res.status(400).json({ message: "Password is required" });
        }

        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = new User({
            firstName,
            lastName,
            userEmail,
            userRole,
            userPassword: hashedPassword,
            tokens: {}
        });

        const accessToken = generateAccessToken(user);
        user.tokens = { accessToken };

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                 user :{
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userEmail: user.userEmail,
                    userRole: user.userRole,
                 }
           ,
                tokens:  accessToken, 
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
};
export const Login = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      const user = await User.findOne({ userEmail });
  
      if (!user) {
     
        return res.status(404).json({ message: "User not found" });
      }
  userEmail, userPassword
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const accessToken = generateAccessToken(user);
  
  
      // user.tokens.accessToken =  accessToken;
  
      // await user.save();
      
  
      res.json({
        message: "Login successful!",
        user: {
          // _id: user._id,
          // userEmail: user.userEmail,
          // ...user,
          // token: {
          //   accessToken: user.tokens.accessToken,
          // },
          user : {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userEmail: user.userEmail,
            userRole: user.userRole,
          },
          token: accessToken,
        },
      });
    } catch (error) {
     
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const getmyprofile = async (req, res) => {
    try {
        const user =  req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User profile retrieved successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

    
   
  }