import { redis } from "../utils/redis";
import { Request, Response, NextFunction } from "express";
const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 5;

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;

    const currentCount = await redis.get(key);

    if (currentCount) {
      if (parseInt(currentCount) >= MAX_WINDOW_REQUEST_COUNT) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else {
        await redis.incr(key);
      }
    } else {
      await redis.set(key, 1, "EX", WINDOW_SIZE_IN_SECONDS);
    }

    next();
  } catch (err) {
    console.error("Rate limiting error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
