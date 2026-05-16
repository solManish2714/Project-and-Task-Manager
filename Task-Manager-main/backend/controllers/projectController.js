import Project from "../models/Project.js";

// CREATE PROJECT (Admin Only)
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newProject = new Project({
      title,
      description,
      createdBy: req.user.id, // This comes from our auth middleware!
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// GET ALL PROJECTS (All logged-in users)
export const getProjects = async (req, res) => {
  try {
    // Populate replaces the 'createdBy' ID with the actual user's name and email
    const projects = await Project.find().populate("createdBy", "name email");
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};
