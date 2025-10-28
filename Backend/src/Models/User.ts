import mongoose, { Document } from "mongoose";
import { getDefaultAutoSelectFamily } from "net";

export interface Iuser extends Document{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    refreshToken:string
}

const userSchema=new mongoose.Schema<Iuser>({
    firstName:{
        type:String,
        required:[true,"Please provide First name"],
        trim:true,
        minLength:[3,"First name must be atleast 3 characters"],
        maxLength:[15,"First name must be atleast 3 characters"]
    },
    lastName:{
        type:String,
        required:[true,"Please provide last name"],
        trim:true,
        minLength:[3,"Last name must be atleast 3 characters"],
        maxLength:[15,"Last name must be atleast 3 characters"]
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:[true,"Provide email"]
    },
    password:{
        type:String,
        required:[true,"Provide password"],
        minLength:[8,"Password must be atleast 8 characters"],
        maxlength:[64,"Password cannot exceed 64 character"]
    },
    refreshToken:{
        type:String,
        default:''
    }
},
{timestamps:true})

const User=mongoose.model<Iuser>("User",userSchema);
export default User;