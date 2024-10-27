import { Jobs } from '../models/jobModel.js';
import { Companies } from '../models/companyModel.js';
import { isValidObjectId } from 'mongoose';

const createJobPosts = async (req, res, next) => {

    let {jobTitle, jobType, salary, vaccancy, location, experience, company} = req.body;

    if(!jobTitle || !jobType) {
        return res.status(404).json({ message: "Please provide necessary details"})
    }

    try{

        const objJobPost = await Jobs.create({
            jobTitle, jobType, salary, vaccancy, location, experience, company
        })
        if(!objJobPost) {
            return res.status(404).json({ message: "Server experiencing issue while creating job posts"})
        } else {

            let result = await Companies.findByIdAndUpdate(company, {$push: {jobPosts: objJobPost._id}}, {new:true});

            let comapniesWithJobs = await Companies.find({_id: company}).populate("jobPosts").select("-password");

            return res.status(200).json({ message: "Successfully create job post.", body:{company: comapniesWithJobs}})
        }

    } catch(error){
        return res.status(404).json({ message: error.message})

    }

    return res.status(200).json({ message: "getCompanies", data: companiesData })
}

export { createJobPosts};