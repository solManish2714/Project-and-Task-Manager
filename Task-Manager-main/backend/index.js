import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"; // <-- NEW
import taskRoutes from "./routes/taskRoutes.js"; // <-- NEW

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes); // <-- NEW
app.use("/api/tasks", taskRoutes); // <-- NEW

app.get("/", (req, res) => {
  res.send("Task Manager API is running!");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Railway MongoDB successfully!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
