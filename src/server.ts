// src/server.ts

import http from "http";
import { Server as IOServer } from "socket.io";
import app from "./app";
import "./config/database";
import "./models/User";
import pinboardRouter from "./routes/pinboard";
import availabilityRouter from "./routes/availability";


// ensure PORT is a number
const PORT = parseInt(process.env.PORT || "5100", 10);

// mount routers (if not already in app.ts)
app.use("/api/pinboard", pinboardRouter);
app.use("/api/availability", availabilityRouter);

// create HTTP server and attach Socket.IO
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
  cors: { origin: "*" }, // tighten origin in production
});

// make io available in controllers
app.set("io", io);

// socket connection handlers
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("⚪️ Client disconnected:", socket.id);
  });
});

// start listening
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
});
