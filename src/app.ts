// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

dotenv.config();

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
app.use("/api/flashcard-sessions", flashcardSessionRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/tools/analytics", analyticsRoutes);


// Auth routes POST
app.post("/api/tools/legal-complaint", generateComplaint);






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

export default app;
