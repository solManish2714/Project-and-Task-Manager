import jwt from "jsonwebtoken";

// 1. Check if user has a valid token
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attaches the user's ID and Role to the request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// 2. Check if the user is an Admin
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};
