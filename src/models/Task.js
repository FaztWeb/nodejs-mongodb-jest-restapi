import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);
