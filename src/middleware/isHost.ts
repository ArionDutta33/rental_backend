import { Response, Request, NextFunction } from "express";
import { AuthenticatedRequest } from "./isAuthenticated";
import { ApiError } from "../utils/ApiError";
import HTTP_STATUS from "../utils/HttpStatus";

export const isHost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const isHost = req.user?.role;
    if (isHost !== "HOST") {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "Acces denied");
    }
    next();
  } catch (error) {
    return next(new ApiError(HTTP_STATUS.FORBIDDEN, "Access denied"));
  }
};
