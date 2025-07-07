import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import authorize from "../middleware/authorize";
import asyncHandler from "../utils/asyncHandler";
import {
  getAllCaseFolders,
  getCaseFolderById,
  createCaseFolder,
  updateCaseFolder,
  deleteCaseFolder,
} from "../controllers/caseFolderController";
import caseTimelineEventRouter from "./caseTimelineEvent";

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

router.get("/", authorize(...allowedRoles), asyncHandler(getAllCaseFolders));
router.get("/:id", authorize(...allowedRoles), asyncHandler(getCaseFolderById));
router.post("/", authorize(...allowedRoles), asyncHandler(createCaseFolder));
router.put("/:id", authorize(...allowedRoles), asyncHandler(updateCaseFolder));
router.delete("/:id", authorize(...allowedRoles), asyncHandler(deleteCaseFolder));
router.use("/:caseFolderId/timeline-events", caseTimelineEventRouter);

export default router;
