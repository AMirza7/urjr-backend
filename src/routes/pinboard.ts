import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import authorize from "../middleware/authorize";
import asyncHandler from "../utils/asyncHandler";
import {
  getAllPinboardPosts,
  getPinboardPostById,
  createPinboardPost,
  updatePinboardPost,
  deletePinboardPost,
} from "../controllers/pinboardController";

const router = Router();

const allowedRoles = [
  "lawyer",
  "junior_lawyer",
  "legal_assistant",
  "office_helper",
  "legal_clerk",
  "law_student",
  "admin",
  "user"
] as const;

router.use(requireAuth);

router.get("/", authorize(...allowedRoles), asyncHandler(getAllPinboardPosts));
router.get("/:id", authorize(...allowedRoles), asyncHandler(getPinboardPostById));
router.post("/", authorize(...allowedRoles), asyncHandler(createPinboardPost));
router.put("/:id", authorize(...allowedRoles), asyncHandler(updatePinboardPost));
router.delete("/:id", authorize(...allowedRoles), asyncHandler(deletePinboardPost));

export default router;
