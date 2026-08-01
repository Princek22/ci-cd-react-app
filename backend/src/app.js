const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

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

app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, title, completed, created_at FROM tasks ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch tasks:", error.message);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  try {
    const [result] = await db.execute("INSERT INTO tasks (title) VALUES (?)", [
      title.trim(),
    ]);

    const [
      rows,
    ] = await db.execute(
      "SELECT id, title, completed, created_at FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Failed to create task:", error.message);

    res.status(500).json({
      error: "Failed to create task",
    });
  }
});

module.exports = app;
