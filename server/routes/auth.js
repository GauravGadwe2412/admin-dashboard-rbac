const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = "supersecretkey_123456789!@#$";

const mockUsers = [
  { email: "admin@site.com", password: "admin123", role: "admin" },
  { email: "editor@site.com", password: "editor123", role: "editor" },
  { email: "viewer@site.com", password: "viewer123", role: "viewer" },
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", email, password);

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    console.log("Invalid credentials");
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "10m" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 10 * 60 * 1000, // 10 minutes
  });
  res.json({ message: "Login successful" });
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      userId: decoded.userId,
      role: decoded.role,
      exp: decoded.exp,
    });
  } catch {
    res.status(401).json({ error: "Token expired or invalid" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  res.sendStatus(200);
});

module.exports = router;
