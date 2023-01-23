import express from "express";
import { protect, admin } from "../Middleware/middleware.js";
import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../Controller/userController.js";
const router = express.Router();

router.post("/login", userAuth);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect, admin, getUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
