import { Response } from "express";
import { ApiResponse } from "../Types/ApiResponse/ApIResponse";


export const sendError = <T>(
  res: Response,
  message: string,
  statusCode: number = 400
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: false,
    message,
  };

  // only include data if it exists
  

  return res.status(statusCode).json(message);
};
