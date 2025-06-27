const express = require("express");
require("dotenv").config();
const conn = require("./conn/conn");
const authRouter = require("./routes/auth").router;
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
