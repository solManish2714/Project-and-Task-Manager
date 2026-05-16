import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
  });
  const [taskForm, setTaskForm] = useState({
    title: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
  });

  // Fetch all data when the page loads
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projRes = await axios.get("/projects");
      const taskRes = await axios.get("/tasks");
      setProjects(projRes.data);
      setTasks(taskRes.data);

      // Only Admins can fetch the user list for the assignment dropdown
      if (user?.role === "ADMIN") {
        const userRes = await axios.get("/auth/users");
        setUsersList(userRes.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/projects", projectForm);
      setProjectForm({ title: "", description: "" });
      fetchData(); // Refresh the lists
    } catch (err) {
      alert("Error creating project");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", taskForm);
      setTaskForm({ title: "", projectId: "", assignedTo: "", dueDate: "" });
      fetchData(); // Refresh the lists
    } catch (err) {
      alert("Error creating task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchData(); // Refresh the lists
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Logged in as:{" "}
              <strong className="text-blue-600">
                {user?.name} ({user?.role})
              </strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Controls (Hidden for standard Members) */}
        {user?.role === "ADMIN" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create Project Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Create Project</h2>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Project Title"
                  className="w-full p-2 border rounded"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Create Project
                </button>
              </form>
            </div>

            {/* Create Task Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Assign Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Task Title"
                  className="w-full p-2 border rounded"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                />

                <select
                  required
                  className="w-full p-2 border rounded"
                  value={taskForm.projectId}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, projectId: e.target.value })
                  }
                >
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>

                <select
                  required
                  className="w-full p-2 border rounded"
                  value={taskForm.assignedTo}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, assignedTo: e.target.value })
                  }
                >
                  <option value="">Assign To User</option>
                  {usersList.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>

                <input
                  required
                  type="date"
                  className="w-full p-2 border rounded"
                  value={taskForm.dueDate}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, dueDate: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                  Assign Task
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Task List (Visible to everyone) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 border-b">Task</th>
                    <th className="p-3 border-b">Project</th>
                    <th className="p-3 border-b">Assigned To</th>
                    <th className="p-3 border-b">Due Date</th>
                    <th className="p-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{task.title}</td>
                      <td className="p-3 text-gray-600">
                        {task.projectId?.title || "Unknown Project"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {task.assignedTo?.name || "Unassigned"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <select
                          className={`p-1 rounded font-semibold text-sm ${
                            task.status === "DONE"
                              ? "bg-green-100 text-green-800"
                              : task.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task._id, e.target.value)
                          }
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DONE">Done</option>
                          <option value="OVERDUE">Overdue</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
