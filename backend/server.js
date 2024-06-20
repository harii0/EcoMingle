import express from "express";
import cors from "cors";
import app from "./app.js";
import connectDb from "./db/connection.js";
import 'dotenv/config'


const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDb().then(() => {
            console.log("connected to database");
        })
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
startServer();





