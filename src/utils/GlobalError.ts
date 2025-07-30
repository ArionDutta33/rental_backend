import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export const errorHandler = (
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const errors = err instanceof ApiError && err.errors;

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
