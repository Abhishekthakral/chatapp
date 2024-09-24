import mongoose from 'mongoose'
import { DB_Name } from '../constants.js';

const connectDB=async()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`);
        console.log("connected to db");
    }catch(error){
        console.log("connection failed with database",error);
    }
}

export default connectDB;