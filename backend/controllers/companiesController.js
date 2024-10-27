import { Companies } from '../models/companyModel.js';
import { isValidObjectId } from 'mongoose';

const getCompanies = async (req, res, next) => {

    let companiesData = await Companies.find();

    return res.status(200).json({ message: "getCompanies", data: companiesData })
}

const registerCompany = async (req, res, next) => {
    const { email, password, name, contact, location, about } = req.body;

    if (!email || !password || !name) {
        res.status(404).json({ messege: "Please enter all required fields" })
        return;
    }

    try {

        let isCompanyExist = await Companies.findOne({email});

        if(isCompanyExist) {
            res.status(404).json({ messege: "Company already exists." })
        } else {
            let objInsrtCompany = await Companies.create({email, password, name, contact, location, about});

            if(!objInsrtCompany) {
                res.status(404).json({ messege: "Error occured while creating company." }) 
            } else {
                res.status(200).json({ messege: "Success while creating company." }) 
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ messege: error.messege })
    }
}

const signInUsingCompanyDetails = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(404).json({ message: "Please enter all required fields."})
    }

    try {

        let isCompanyExists = await Companies.findOne({email});

        if(!isCompanyExists) {
            return res.status(404).json({ message: "Company doesn't exists. Please Register."})
        } else {
            let isPwdCorrect = await isCompanyExists.isPasswordCorrect(password);

            if(!isPwdCorrect) {
                return res.status(404).json({ message: "Company doesn't exists. Please Register."})
            } else {

                let company = await Companies.findById(isCompanyExists._id).select("-password -createdAt -updatedAt");
                let token = await isCompanyExists.createToken();
                return res.status(200).json({ message: "Sucessfully signed up.", body: {token: token, company: company}})
            }
        }
    } catch(error) {
        console.log(error)
        res.status(404).json({ message: error.message})
    }

}

const updateCompanyDetails = async (req, res, next) => {
    const {_id, name, contact, location, about } = req.body;

    if(!isValidObjectId(_id)) {
        res.status(404).json({ messege: "Error while updating. Please try with valid company" })
        return
    }

    try {

        let objUpdateCompany = await Companies.findByIdAndUpdate(_id,
            {
                $set: {
                    name, contact,location,about
                }
            },
            {new: true}
        );

        if(!objUpdateCompany) {
            return res.status(404).json({ message: "Error while updating. Please try again."})
        } else {
            return res.status(200).json({ message: "Sucessfully signed up.", body: {company: objUpdateCompany}})
        }
    } catch(error) {
        console.log(error)
        res.status(404).json({ message: error.message})
    }

}

const searchCompanies = async (req, res, next) => {
    const {search, sort, location, page = 1, limit = 10 } = req.query;

    try {

        let queryObject = {
            $or:[
                {name:{$regex: search, $options:"i"}},
                {location:{$regex:location, $options:"i"}}
            ]
        }
        const sortList = sort.split(",").join(" "); // Convert comma-separated values to space-separated
        // const skip = (page - 1) * limit; // Calculate the number of documents to skip

        // let objCompany = await Companies.find(queryObject).select("-password").sort(sortList).skip(skip).limit(Number(limit));
        let objCompany = await Companies.find(queryObject).select("-password").sort(sortList);

        if(!objCompany) {
            return res.status(404).json({ message: "Error while updating. Please try again."})
        } else {
            return res.status(200).json({ message: "Sucessfully signed up.", body: {company: objCompany}})
        }
    } catch(error) {
        console.log(error)
        res.status(404).json({ message: error.message})
    }

}


export { getCompanies, registerCompany, signInUsingCompanyDetails, updateCompanyDetails, searchCompanies };