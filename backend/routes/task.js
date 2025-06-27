const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

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
    const taskId = savedTask._id;

    await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });

    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
