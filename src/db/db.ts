import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!).then(() => {
      console.log("Mongodb connected");
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
