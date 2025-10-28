import User from "../Models/User";
import bcrypt from "bcrypt";
import { sendSuccess } from "../Utils/ApiHandler/SendSucess";
import { CatchAsync } from "../Middlewares/CatchAsync";
import { sendError } from "../Utils/ApiHandler/sendError";
import { logger } from "../Utils/logger";
import { generateAccessToken, generateRefreshToken } from "../Utils/JwtToken";

export const SignUpUser = CatchAsync(async (req, res) => {
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

  logger.info(`User registered successfully with email ${email}`);

  // Success response
  return sendSuccess<string>(res, "User signed up successfully", accessToken);

});
