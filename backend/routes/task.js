const express = require("express");
const Task = require("../models/Task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

const router = express.Router();

// Create task
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(id, { $push: { tasks: savedTask._id } });

    res.status(201).json({ message: "Task created", taskId: savedTask._id });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tasks
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ tasks: user.tasks });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Update task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Update important task
router.put(
  "/update-important-task/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const TaskData = await Task.findById(id);
      const ImpTask = TaskData.important;
      await Task.findByIdAndUpdate(id, { important: !ImpTask });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Fetch Tasks Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);
//Update complete task
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Get important task
router.get("/get-important-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const ImpTaskData = Data.tasks;
    res.status(200).json({ tasks: ImpTaskData });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Get complete task
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const CompTaskData = Data.tasks;
    res.status(200).json({ tasks: CompTaskData });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Get incomplete task
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const IncompTaskData = Data.tasks;
    res.status(200).json({ tasks: IncompTaskData });
  } catch (error) {
    console.error("Fetch Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
