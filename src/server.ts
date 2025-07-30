import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import morgan from "morgan";
import { errorHandler } from "./utils/GlobalError";
import userRoutes from "./route/user.route";
import placeRoutes from "./route/place.route";
import bookingRoutes from "./route/booking,route";

import { connectDB } from "./db/db";
const app: Express = express();
connectDB();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/booking/", bookingRoutes);
app.get("/test", (req, res) => {
  res.send("ok");
});
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
