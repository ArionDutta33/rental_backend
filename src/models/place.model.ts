import mongoose, { Document, model, models } from "mongoose";
interface IPlace extends Document {
  title: string;
  description: string;
  address: string;
  extraInfo: string;
  pictures: string[];
  cancellationPolicy: string;
  rules: string[];
  perks: string[];
  price: number;
  rentType: "monthly" | "yearly";
  user: mongoose.Schema.Types.ObjectId;
  longitude: number;
  latitude: number;
}
const placeSchema = new mongoose.Schema<IPlace>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    extraInfo: {
      type: String,
    },
    cancellationPolicy: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pictures: {
      type: [String],
    },
    rules: {
      type: [String],
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    longitude: {
      type: Number,
    },
    rentType: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    latitude: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Place = mongoose.model("Place", placeSchema);
export default Place;
