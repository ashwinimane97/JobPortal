import mongoose from "mongoose";

const db = async () => {
    try {

        console.log("Connecting to mongodb....");
        const db = await mongoose.connect('mongodb://localhost:27017/jobportal');
        console.log("Connected.");
    } catch(e) {
        console.log("Mongodb connection failed");
        console.log(e);
    }
}

export default db;