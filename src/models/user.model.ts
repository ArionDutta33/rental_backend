import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  profileUrl: string;
  phoneNo: string;
  role: "USER" | "HOST";
  isPasswordValid: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Minimum length of the password must be 8 characters"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    profileUrl: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "HOST"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.isPasswordValid = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
