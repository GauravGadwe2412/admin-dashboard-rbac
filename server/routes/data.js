const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const router = express.Router();

router.get(
  "/orders",
  authenticate,
  authorize(["admin", "editor"]),
  (req, res) => {
    res.json([
      { id: 1, item: "Order A" },
      { id: 2, item: "Order B" },
    ]);
  }
);

router.get("/riders", authenticate, (req, res) => {
  res.json([{ id: 1, name: "Rider X" }]);
});

router.get(
  "/users",
  authenticate,
  authorize(["admin", "editor"]),
  (req, res) => {
    res.json([{ id: 1, name: "User A" }]);
  }
);

router.get("/settings", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ theme: "dark", notifications: true });
});

module.exports = router;
