import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import requireAuth from "../middleware/requireAuth";
import authorize from "../middleware/authorize";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

// All roles allowed here: adjust as needed
router.get(
  "/me",
  requireAuth,
  authorize(
    "lawyer",
    "junior_lawyer",
    "legal_assistant",
    "legal_clerk",
    "office_helper",
    "law_student",
    "admin",
    "user"
  ),
  asyncHandler(getProfile)
);

export default router;
