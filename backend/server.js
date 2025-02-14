require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const expenseRoutes = require("./routes/expenseRoutes");
const saleRoutes = require("./routes/saleRoutes");

app.use("/api/expenses", expenseRoutes);
app.use("/api/sales", saleRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Fix for Vercel: Export the app (instead of app.listen)
module.exports = app;
