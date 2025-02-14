const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  category: String, // e.g., Raw Materials, Employee Salaries, Utilities
  description: String, // What was purchased
  amount: Number, // How much was spent
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
