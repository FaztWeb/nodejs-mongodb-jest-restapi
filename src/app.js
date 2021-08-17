import express from "express";
import { connect } from "mongoose";
import Task from "./models/Task";

(async () => {
  const db = await connect("mongodb://localhost/tasksdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) return res.sendStatus(400);

  const newTask = Task({ title, description });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

export default app;
