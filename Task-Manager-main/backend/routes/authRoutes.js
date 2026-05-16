import express from "express";
import { signup, login, getUsers } from "../controllers/authController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", authenticate, requireAdmin, getUsers); // <-- Added this

export default router;
