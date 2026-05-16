import Task from "../models/Task.js";

// CREATE TASK (Admin Only)
export const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo, dueDate } = req.body;
    const newTask = new Task({ title, projectId, assignedTo, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// GET TASKS (Role-based filtering)
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "ADMIN") {
      // Admins see all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("projectId", "title");
    } else {
      // Members only see tasks assigned to them
      tasks = await Task.find({ assignedTo: req.user.id }).populate(
        "projectId",
        "title",
      );
    }
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// UPDATE TASK STATUS (Members can update their own, Admins can update any)
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Security check: If not an admin, check if the task belongs to the user
    if (
      req.user.role !== "ADMIN" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};
