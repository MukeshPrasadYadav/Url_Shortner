import { Response } from "express";
import { ApiResponse } from "../Types/ApiResponse/ApIResponse";


export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
    message,
  };

  // only include data if it exists
  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
