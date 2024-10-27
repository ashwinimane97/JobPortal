import express from "express";
import {getCompanies, registerCompany, signInUsingCompanyDetails, updateCompanyDetails,searchCompanies} from '../controllers/companiesController.js';
import rateLimit from 'express-rate-limit';
const companyRouter=express.Router();

// Configure rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
});

companyRouter.post("/register", limiter, registerCompany);
companyRouter.get("/", getCompanies);
companyRouter.post("/signIn", signInUsingCompanyDetails);
companyRouter.put("/updateCompanyDetails", updateCompanyDetails);
companyRouter.get("/searchCompanies", searchCompanies);

export default companyRouter