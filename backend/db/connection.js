//setup with mongoose instead of mongodb
import mongoose from 'mongoose'
import 'dotenv/config'
import { DB_NAME } from '../constants.js';


const uri = process.env.ATLAS_URI;

if (!uri) {
    throw new Error("Database URI not found")
}
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.ATLAS_URI}/${DB_NAME}`,);
    } catch (error) {
        throw new Error(`failed to connect to Database : ${error.message}`)
    }
}

export default connectDb;
