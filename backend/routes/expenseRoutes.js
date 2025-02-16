const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Middleware to set CORS headers
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ammas-kitchen.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Add Expense
router.post("/", async (req, res) => {
  try {
    const { category, description, amount } = req.body;
    const newExpense = new Expense({ category, description, amount, date: new Date() });
    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Expenses with Month & Year Filter
router.get("/", async (req, res) => {
  try {
    let { month, year } = req.query;

    if (month && year) {
      month = parseInt(month);
      year = parseInt(year);

      if (isNaN(month) || isNaN(year)) {
        return res.status(400).json({ error: "Invalid month or year format" });
      }

      const startDate = new Date(year, month - 1, 1); // First day of the month
      const endDate = new Date(year, month, 1); // First day of next month

      const expenses = await Expense.find({ date: { $gte: startDate, $lt: endDate } }).sort({ date: -1 });
      return res.json(expenses);
    }

    // If no month/year provided, return all expenses
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
