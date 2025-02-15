const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// Middleware to set CORS headers
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ammas-kitchen.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Add Sale
router.post("/", async (req, res) => {
  try {
    const { item, price, type } = req.body;
    const newSale = new Sale({ item, price, type, date: new Date() });
    await newSale.save();
    res.json(newSale);
  } catch (err) {
    console.error("Error adding sale:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
