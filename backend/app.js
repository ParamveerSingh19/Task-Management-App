const express = require("express");
require("dotenv").config();
const conn = require("./conn/conn");
const { router: authRouter } = require("./routes/auth");
const taskRouter = require("./routes/task");

const app = express();

// Middleware
app.use(express.json());

// Test route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is alive!");
});

// Connect to MongoDB
conn();

// Routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (optional for future)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
