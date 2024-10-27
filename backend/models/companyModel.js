import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const SECRET_KEY="eghjefkrd";

const companySchema = new Schema({
    name:{
        type:String,
        require:[true, 'Company name is required']
    },
    email:{
        type:String,
        require:[true, 'Company email is required'],
        unique:true,
        lowercase:true,
        validate:{
            validator: validator.isEmail,
            message: "Please enter valid email address"
        }
    },
    password:{
        type:String,
        require:[true, "Password is required"],
        validate:{
            validator: (value) => {
                validator.isLength(value, {min:8, max:16})
            },
            message: "Password must be between 8 and 16 characters long"
        }
    },
    contact:{
        type:String
    },
    location:{
        type:String
    },
    about:{
        type:String
    },
    jobPosts:[{
        type: Schema.Types.ObjectId,
        ref: "Jobs"
    }]
}, {timestamps:true})



companySchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();

})

companySchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}


companySchema.methods.createToken = async function() {
    return jwt.sign(
        {
            companyId: this._id,
            email: this.email,
            name: this.name
        },
        SECRET_KEY,
        {
            expiresIn: '15m'
        }
    )
}


export const Companies = mongoose.model("Companies", companySchema);