import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Place from "../models/place.model";
import { uploadCloudinary } from "../utils/cloudinary";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { ApiError } from "../utils/ApiError";
import HTTP_STATUS from "../utils/HttpStatus";
import { ApiResponse } from "../utils/Response";
import { getCoords } from "../service/encode";
import { redis } from "../utils/redis";

export const createPlace = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("inside create place");
  try {
    const {
      title,
      description,
      cancellationPolicy,
      address,
      extraInfo,
      price,
      rules,
      perks,
      longitude,
      latitude,
      rentType,
    } = req.body;
    const parsedRules = JSON.parse(rules);
    const parsedPerks = JSON.parse(perks);
    console.log("json parse", JSON.parse(req.body.perks));
    console.log("not parsed", req.body.perks);
    console.log(req.body.perks);
    let uploadedImages: any[] = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadCloudinary(file.path).then((res) => res?.secure_url)
        )
      );
    }
    const location = await getCoords(address);

    const createdPlace = await Place.create({
      ...req.body,
      title,
      description,
      extraInfo,
      rules: parsedRules,
      perks: parsedPerks,
      address,
      longitude: location.lng,
      latitude: location.lat,
      price,
      cancellationPolicy,
      pictures: uploadedImages,
      user: req.user?.userId,
    });
    if (!createdPlace) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Unable to create place"
      );
    }
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Place created", createdPlace, true));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { term } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `places:search:${
      term || "all"
    }:page=${page}:limit=${limit}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            "Places fetched (from cache)",
            JSON.parse(cachedData),
            true
          )
        );
    }

    const query = term
      ? {
          $or: [
            { title: { $regex: term, $options: "i" } },
            { description: { $regex: term, $options: "i" } },
            { address: { $regex: term, $options: "i" } },
            { cancellationPolicy: { $regex: term, $options: "i" } },
          ],
        }
      : {};

    const total = await Place.countDocuments(query);
    const places = await Place.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user", "username email profileUrl");

    const responseData = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: places,
    };

    await redis.set(cacheKey, JSON.stringify(responseData), "EX", 600);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Places fetched", responseData, true));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Search failed")
    );
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const checkCached = await redis.get(`place${id}`);
    if (checkCached) {
      console.log("chekec cahec", checkCached);
      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse("Place found", JSON.parse(checkCached), true));
    }
    const placeById = await Place.findById(id).populate(
      "user",
      "username email profileUrl"
    );
    if (!placeById) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "No place found");
    }
    await redis.set(`place${id}`, JSON.stringify(placeById), "EX", 1800);
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Place fetched", placeById, true));
  } catch (error) {
    next(error);
  }
};
export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const placeById = await Place.findById(id);
    if (!placeById) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Place not found");
    }
    const updatedPlace = await Place.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Place updated", updatedPlace, true));
  } catch (error) {
    next(error);
  }
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const placeById = await Place.findById(id);
    if (!placeById) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Place not found");
    }
    await Place.findByIdAndDelete(id);
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse("Place updated", {}, true));
  } catch (error) {
    next(error);
  }
};
