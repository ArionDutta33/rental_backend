import { Router } from "express";
import { login, register } from "../controller/user.controller";
import { upload } from "../middleware/multer";
import { uploadCloudinary } from "../utils/cloudinary";
import { isAuthenticated } from "../middleware/isAuthenticated";
import {
  createPlace,
  deletePlace,
  getById,
  search,
  updatePlace,
} from "../controller/place.controller";
import { isHost } from "../middleware/isHost";
const router = Router();
router.post(
  "/create",
  isAuthenticated,
  isHost,
  upload.array("photos", 10),
  createPlace
);
router.get("/search", search);
router.get("/:id", getById);
router.patch("/:id", isAuthenticated, isHost, updatePlace);
router.delete("/:id", isAuthenticated, isHost, deletePlace);

export default router;
