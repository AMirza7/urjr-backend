// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import sectionsV1Router from './routes/sections'; // this now serves v1


dotenv.config();
// 2) import *all* your models so Sequelize registers them
import "./models/User";
import "./models/State";
import "./models/City";
import "./models/LegalTemplate";
import "./models/Transaction";
import "./models/Subscription";
import "./models/Engagement";
import "./models/Flashcard";
import "./models/FlashcardSession";
import "./models/SecureNote";
import "./models/PinboardPost";
import "./models/Notification";
import "./models/LegalToolLog";

import { initAssociations } from "./models/Associations";
initAssociations(); 

import authRoutes from "./routes/auth";
import pinboardRouter from "./routes/pinboard";
import errorHandler from "./middleware/errorHandler";
import caseFolderRouter from "./routes/caseFolder";
import adminRoutes from "./routes/admin";
import preferencesRoutes from "./routes/preferences";
import notificationRoutes from "./routes/notifications";
import messagesRoutes from "./routes/messages";
import documentRoutes from "./routes/documents";
import secureNotesRoutes from "./routes/secureNotes";
import legalTemplateRoutes from "./routes/legalTemplates";
import flashcardSessionRoutes from "./routes/flashcardSessions";
import toolRoutes from "./routes/tools";
import { generateComplaint } from "./controllers/tools/legalComplaintController";
import analyticsRoutes from "./routes/analytics";
import clerksRouter from "./routes/clerks";
import engagementsRouter from "./routes/engagements";
import availabilityRouter from "./routes/availability";
import paymentsRouter from "./routes/payments";
import subscriptionsRouter from "./routes/subscriptions";
import adminTemplatesRouter from "./routes/adminTemplates";
import sectionsRouter from './routes/sections';



const app = express();

app.use(cors());
app.use(express.json());

// Auth routes .use
app.use("/api/auth", authRoutes);
app.use("/api/case-folders", caseFolderRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/clerks", clerksRouter);
app.use("/api/engagements", engagementsRouter);
app.use("/api/secure-notes", secureNotesRoutes);
app.use("/api/legal-templates", legalTemplateRoutes);
app.use("/api/admin/templates", adminTemplatesRouter);
app.use("/api/flashcard-sessions", flashcardSessionRoutes);
app.use("/api/availability", availabilityRouter);
app.use("/api/tools", toolRoutes);
app.use("/api/tools/analytics", analyticsRoutes);
app.use("/api/payments", paymentsRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use('/api/sections', sectionsRouter);


// Auth routes POST
app.post("/api/tools/legal-complaint", generateComplaint);




// 1️⃣ Versioned mount
// Rate‐limit to 100 requests per minute per IP
const sectionsLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  message: { error: 'Too many requests, please slow down.' },
});

app.use('/api/v1/sections', sectionsLimiter, sectionsV1Router);


// Pinboard routes
app.use("/api/pinboard", pinboardRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use(errorHandler);


app.use(cors({ origin: '*' }));

export default app;
