import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import mongosanitize from 'express-mongo-sanitize';
import db from './db/dbConnection.js';
import routes from './routes/routes.js'


const app = express();

app.use(cors());
app.use(xss());
app.use(mongosanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);


db();

const PORT = process.env.PORT || 4002;


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})