const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  item: String,
  price: Number,
  type: String,
  date: { type: Date, default: Date.now },  // Ensure it's stored as a Date type
});

module.exports = mongoose.model("Sale", SaleSchema);
