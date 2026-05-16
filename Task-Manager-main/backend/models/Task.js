import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE", "OVERDUE"],
      default: "TODO",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
