import mongoose, { Schema } from "mongoose";
import validator from "validator";


const userSchema = new Schema({
    email: {
        type: String,
        require: [true, "Please enter email"],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter valid email"
        }
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isLength(value, { min: 8, max: 16 })
            },
            message: "Password must be between 8 and 16 characters long"
        }
    },
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    accountType:{
        type:String,
        default:"seeker"
    },
    contact:{
        type:String
    },
    location:{
        type:String
    },
    profileUrl:{
        type:String
    },
    jobTitle:{
        type:String
    },
    about:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})