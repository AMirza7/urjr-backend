import express from "express";
import { getStampDuty } from "../controllers/tools/stampDutyController";
import { generateComplaint } from "../controllers/tools/legalComplaintController";
import { generateCourtFeeEstimate } from "../controllers/tools/courtFeeController";
import { generateSectionSuggestions } from "../controllers/tools/sectionSuggesterController";
import { generateRightsSummary } from "../controllers/tools/rightsExplainerController";
import { detectLoopholes } from "../controllers/tools/loopholeFinderController";
import { generateBailPrediction } from "../controllers/tools/bailPredictorController";
import { createPOA } from "../controllers/tools/poaBuilderController";
import { checkPerjury } from "../controllers/tools/perjuryScreenerController";
import { generateAffidavit } from "../controllers/tools/affidavitComposerController";
import { analyzeQuashRequest } from "../controllers/tools/quashEligibilityController";
import { generateBailRefilingStrategy } from "../controllers/tools/bailStrategyController";


const router = express.Router();
router.post("/stamp-duty", getStampDuty);
router.post("/legal-complaint", generateComplaint);
router.post("/suggest-sections", generateSectionSuggestions);
router.post("/rights-explainer", generateRightsSummary);
router.post("/court-fee", generateCourtFeeEstimate);
router.post("/complaint-loopholes", detectLoopholes);
router.post("/bail-predict", generateBailPrediction);
router.post("/build-poa", createPOA);
router.post("/screen-perjury", checkPerjury);
router.post("/compose-affidavit", generateAffidavit);
router.post("/check-quash-eligibility", analyzeQuashRequest);
router.post("/bail-strategy", generateBailRefilingStrategy);


export default router;
