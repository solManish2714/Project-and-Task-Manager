# 🚀 Team Task Manager

A full-stack, Role-Based Access Control (RBAC) task management web application built with the MERN stack. Designed to allow teams to organize projects, assign tasks, and track progress securely.

### 🔗 Live Demo
**[Experience the live application here](https://team-task-manager-sage.vercel.app)**

*(Frontend hosted on Vercel, Backend and Database hosted on Railway)*

---

## 🔑 Test Credentials
To evaluate the Role-Based Access Control and assignment features, please use the following Admin credentials:
* **Email:** `admin2@test.com` 
* **Password:** `password123`

---

## ✨ Key Features

* **Secure Authentication:** JSON Web Token (JWT) based authentication with securely hashed passwords using `bcryptjs`.
* **Role-Based Access Control (RBAC):**
  * **Admins:** Can create new projects, view all tasks globally, and assign tasks to any registered team member.
  * **Members:** Have a focused view of only the tasks explicitly assigned to them and can update their task statuses.
* **Responsive UI:** Clean, modern interface styled completely with Tailwind CSS.
* **RESTful API Architecture:** Robust backend handling isolated routing, middleware security checks, and database interactions.

---

## 🛠️ Tech Stack

### Frontend
* **React 18** (Bootstrapped with Vite for high performance)
* **Tailwind CSS** (Utility-first styling)
* **React Router DOM** (Client-side routing and protected routes)
* **Axios** (API requests with automated token interception)

### Backend
* **Node.js & Express** (Server environment and routing)
* **MongoDB & Mongoose** (NoSQL database and Object Data Modeling)
* **JSON Web Tokens (JWT)** (Stateless authorization)

---

## 💻 Local Setup Instructions

If you wish to run this application locally on your machine, follow these steps:

### Prerequisites
* Node.js installed on your machine.
* A MongoDB database URI (local or Atlas).

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.
