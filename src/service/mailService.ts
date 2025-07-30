import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError";
import HTTP_STATUS from "../utils/HttpStatus";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
export const sendMail = async (to: string, sub: string, body: string) => {
  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_MAIL,
      to: to,
      subject: sub,
      html: body,
    });
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Failed to send mail"
    );
  }
};
