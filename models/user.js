import mongoose from 'mongoose';




const  UserSchema= new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [50, 'Last name cannot exceed 50 characters']
  },
  userEmail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  userPassword: {
    type: String,
    required: [true, 'Password is required'],
  },
  userRole: {
    type: String,
    enum: ['Admin', 'user'],
    default: 'Admin'
  },
  tokens: {
    accessToken: { type: String, default: null }, 
},

})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;