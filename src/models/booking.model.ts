import mongoose, { Document } from "mongoose";
interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  place: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  status: STATUS;
}
enum STATUS {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  SUCCESS = "SUCCESS",
}
const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Place",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: { type: Date, required: true },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
