import express from "express";
import {createJobPosts} from '../controllers/jobsController.js';
import rateLimit from 'express-rate-limit';
const jobRouter=express.Router();

// Configure rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
});

jobRouter.post("/createJobs", limiter, createJobPosts);

export default jobRouter