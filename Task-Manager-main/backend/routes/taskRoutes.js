import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, requireAdmin, createTask);
router.get("/", authenticate, getTasks);
router.patch("/:id/status", authenticate, updateTaskStatus);

export default router;
