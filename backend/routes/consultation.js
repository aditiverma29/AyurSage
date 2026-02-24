const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Consultation = require("../models/Consultation");

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Save booking
router.post("/", auth, async (req, res) => {
  try {
    const saved = await Consultation.create({
      userId: req.userId,
      ...req.body,
    });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving consultation" });
  }
});

module.exports = router;
