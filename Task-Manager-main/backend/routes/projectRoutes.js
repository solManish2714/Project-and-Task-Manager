import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Notice the middleware: authenticate first, THEN requireAdmin
router.post("/", authenticate, requireAdmin, createProject);
router.get("/", authenticate, getProjects);

export default router;
