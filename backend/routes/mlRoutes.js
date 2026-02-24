const express = require("express");
const axios = require("axios");

const router = express.Router();

// DOSHA PREDICTION
router.post("/predict-dosha", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/predict-dosha",
      { features: req.body.features }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Dosha ML error:", error.message);
    res.status(500).json({ error: "ML Dosha server error" });
  }
});

// DISEASE PREDICTION
router.post("/predict-disease", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/predict-disease",
      { features: req.body.features }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Disease ML error:", error.message);
    res.status(500).json({ error: "ML Disease server error" });
  }
});

module.exports = router;