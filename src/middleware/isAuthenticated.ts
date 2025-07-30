import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import HTTP_STATUS from "../utils/HttpStatus";

interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, "secret") as JwtPayload;

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token"));
  }
};
