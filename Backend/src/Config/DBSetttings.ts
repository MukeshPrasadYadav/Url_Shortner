import mongoose from "mongoose";
import { logger } from "../Utils/logger";

const ConnectDB=async()=>{
    try {
        const url=process.env.CONNECTION_URL as string || "";
        console.log(url)
        mongoose.connect(url)
        
    } catch (error:any) {
        logger.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
    }
}

export default ConnectDB;