
import  User from "../models/user.js";
import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/tokenGenerating.js";

export const Register = async (req, res) => {
    try {
        const { firstName, lastName, userEmail, userPassword  } = req.body;

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
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userEmail: user.userEmail,
           
                tokens: {
                    accessToken: user.tokens.accessToken,
                }
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
        // User not found
        return res.status(404).json({ message: "User not found" });
      }
  userEmail, userPassword
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const accessToken = generateAccessToken(user);
  
  
      user.tokens.accessToken =  accessToken;
  
      await user.save();
  
      res.json({
        message: "Login successful!",
        user: {
          _id: user._id,
          userEmail: user.userEmail,
          
          token: {
            accessToken: user.tokens.accessToken,
          },
        },
      });
    } catch (error) {
      // General error handling
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
