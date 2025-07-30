import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import {
  bookPlace,
  confirmBooking,
  deleteBooking,
} from "../controller/booking.controller";
const router = Router();
router.post("/:id", isAuthenticated, bookPlace);
router.post("/:id/confirm", isAuthenticated, confirmBooking);
router.delete("/:id", isAuthenticated, deleteBooking);
export default router;
