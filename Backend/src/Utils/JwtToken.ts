import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { logger } from "./logger";
import { log } from "console";
dotenv.config();

export const generateAccessToken = (userId: string) => {
    logger.info("Access Token assigned")
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m", // short lifespan
  });
};

export const generateRefreshToken = (userId: string) => {
    logger.info("Refresh Token assigned")
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d", // long lifespan
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    logger.info("Access Token verified");
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (err) {
    logger.error("Access token verificatin failed")
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    logger.info("Refresh token verified");
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    logger.error("Refresh token verificatin failed")
    return null;
  }
};
