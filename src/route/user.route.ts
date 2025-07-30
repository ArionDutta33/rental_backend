import { Router } from "express";
import { getAllBookings, login, register } from "../controller/user.controller";
import { upload } from "../middleware/multer";
import { uploadCloudinary } from "../utils/cloudinary";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = Router();
router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.post("/test", upload.single("profile"), async (req, res) => {
  try {
    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_KEY ||
      !process.env.CLOUDINARY_SECRET
    ) {
      throw new Error("Cloudinary environment variables not set properly.");
    }

    if (req.file) {
      const url = await uploadCloudinary(req.file.path);
      console.log(url?.secure_url);
    }
    return res.status(200);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", isAuthenticated, getAllBookings);
router.get("/check", isAuthenticated, (req, res) => {
  return res.status(200).json("all good");
});
export default router;
