import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../Utils/ApiHandler/sendError";
import User from "../Models/User";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const VerifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ✅ Get token from cookies (preferred) or headers
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.toString().replace("Bearer ", "");

    if (!token) {
      return sendError(res, "Access denied. No token provided.", 401);
    }

    // ✅ Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded?.id) {
      return sendError(res, "Invalid token", 403);
    }

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    // ✅ Attach user to request
    (req as any).user = user;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return sendError(res, "Token expired. Please log in again.", 401);
    }
    return sendError(res, "Unauthorized", 401);
  }
};
