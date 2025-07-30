import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import HTTP_STATUS from "../utils/HttpStatus";
import User from "../models/user.model";
import { ApiResponse } from "../utils/Response";
import { uploadCloudinary } from "../utils/cloudinary";
import Booking from "../models/booking.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username, role } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid request");
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User already exists");
    }
    let uploadImage;
    if (req.file) {
      uploadImage = await uploadCloudinary(req.file.path);
    }
    await User.create({
      email,
      password,
      username,
      ...(req.body.role === "HOST" && { role: "HOST" }),
      profileUrl: uploadImage?.secure_url,
    });
    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse("User registered", {}, true));
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid request");
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Register first");
    }
    if (!existingUser.isPasswordValid(password)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid credentials");
    }
    const payload = {
      userId: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };
    const token = jwt.sign(payload, "secret", { expiresIn: "1h" });

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Log in success", token, true));
  } catch (error) {
    next(error);
  }
};
export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    if (!userById) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found ");
    }
    const allBookings = await Booking.find({ user: id });
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Bookings fetched", allBookings, true));
  } catch (error) {}
};
