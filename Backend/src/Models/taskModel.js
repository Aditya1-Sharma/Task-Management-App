import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Under Review", "Completed"],
    },
    priority: {
      type: String,
      Enumerator: ["Low", "Medium", "High"],
    },
    deadline: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const tasks = mongoose.model("tasks", taskSchema);
