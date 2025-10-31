import User from "../Models/User";
import bcrypt, { compareSync } from "bcrypt";
import { sendSuccess } from "../Utils/ApiHandler/SendSucess";
import { CatchAsync } from "../Middlewares/CatchAsync";
import { sendError } from "../Utils/ApiHandler/sendError";
import { logger } from "../Utils/logger";
import { generateAccessToken, generateRefreshToken } from "../Utils/JwtToken";

 const SignUp = CatchAsync(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if user already exists
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    logger.warn(`Signup failed — email already registered: ${email}`);
    return sendError<null>(res, "User already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return sendError<null>(res, "Something went wrong", 500);
  }
  logger.info(`User registered successfully with email ${email}`);

  // Success response
  return sendSuccess<string>(res, "User signed up successfully" );

});

const Login=CatchAsync(async(req,res)=>{
  const {email,password}=req.body;
  
  const user=await User.findOne({email});
  if(!user) return sendError<null>(res,`No User found with this email ${email}`)
    console.log("passowrd",password)
    console.log("correctPassword",user.password)
  const isPasswordCorrect= await bcrypt.compare(password,user.password);
if(!isPasswordCorrect) return sendError<null>(res,"Wrong password",403)

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  logger.info(`user ${user._id} logged in`);
  return sendSuccess<string>(res,"User Sucessfully logged in");
})

const Logout=CatchAsync(async(req,res)=>{
})

export const AuthController= {SignUp,Login,Logout} 
