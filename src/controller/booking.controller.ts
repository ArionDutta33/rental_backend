import { NextFunction, Response, Request } from "express";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import HTTP_STATUS from "../utils/HttpStatus";
import { ApiError } from "../utils/ApiError";
import Place from "../models/place.model";
import Booking from "../models/booking.model";
import { ApiResponse } from "../utils/Response";

export const bookPlace = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("inside book");
    const { placeId, startDate, endDate } = req.body;
    const userId = req.user?.userId;

    if (!placeId || !startDate || !endDate) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Missing required fields");
    }

    const place = await Place.findById(placeId);
    if (!place) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Place not found");
    }

    const overlappingBooking = await Booking.findOne({
      place: placeId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (overlappingBooking) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "This place is already booked for the selected dates"
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const totalPrice = days * place.price;

    const newBooking = await Booking.create({
      user: userId,
      place: placeId,
      startDate,
      endDate,
      totalPrice,
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse("Booking created", newBooking, true));
  } catch (error) {
    next(error);
  }
};
export const confirmBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check status and all
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "No bookings found");
    }
    //update status
    await Booking.findByIdAndUpdate(id, { status: "CONFIRMED" });
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Booking confirmed", {}, true));
  } catch (error) {
    next(error);
  }
};
export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bookingById = await Booking.findById(id);
    if (!bookingById) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Place not found");
    }
    await Booking.findByIdAndDelete(id);
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Place deleted", {}, true));
  } catch (error) {
    next(error);
  }
};
