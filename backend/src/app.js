const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

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

module.exports = app;