import express from 'express';
import companyRouter from './companyRoutes.js';
import jobRouter from './jobRoutes.js';
const routes = express.Router();

const path = "/api-v1/";

routes.use(`${path}companies`, companyRouter)
routes.use(`${path}jobs`, jobRouter)


export default routes;