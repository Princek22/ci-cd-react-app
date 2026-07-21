const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const APP_ENV = process.env.APP_ENV || "local";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: APP_ENV,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
