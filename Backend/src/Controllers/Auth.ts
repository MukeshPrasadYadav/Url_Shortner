import User from "../Models/User";
import bcrypt from 'bcrypt'
import { sendSuccess } from "../Utils/ApiHandler/SendSucess";
import { CatchAsync } from "../Middlewares/CatchAsync";
import { sendError } from "../Utils/ApiHandler/sendError";
import { logger } from "../Utils/logger";


 export const SignUpUser=CatchAsync(async(req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    const isExistingUSer=await User.findOne({email});
    if(isExistingUSer){
        logger.warn(`Signup failed — email already registered: ${email}`);
       return sendError<null>(res,"UserAlready exixts",400);
    } 
    const hashPassword= await bcrypt.hash(password,12);
    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword
    });
    logger.info(`user registered sucessfully with email ${email}`)
    return sendSuccess<null>(res,"User Signed Up sucessfully");
    
})