import app from "./app";
import "./config/database";
import "./models/User";
import pinboardRouter from "./routes/pinboard";


const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GOOD (reachable on LAN/WiFi, works for all devices)
app.listen(5100, "0.0.0.0", () => {
  console.log("Listening on 0.0.0.0:5100");
});