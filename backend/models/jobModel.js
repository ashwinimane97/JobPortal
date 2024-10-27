import mongoose, {Schema} from "mongoose";

const jobSchema = new Schema({
    company:{
        type:Schema.Types.ObjectId,
        ref: "Companies"
    },
    jobTitle:{
        type:String,
        require:[true, "Job title is required"]
    },
    jobType:{
        type:String,
        require:[true,"Job type is required"]
    },
    salary:{
        type:Number,
        require:true
    },
    vaccancy:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:[true, "Location is required"]
    },
    experience:{
        type:Number,
        require:true
    },
    detail:[
        {
            desc:{
                type:String
            },
            requirements:{
                type:String
            }
        }
    ],
    application:[
        {
            type:Schema.Types.ObjectId,
            ref:"Users"
        }
    ]
}, {timestamps:true})


export const Jobs = mongoose.model("Jobs", jobSchema);