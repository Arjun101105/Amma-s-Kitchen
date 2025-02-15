require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://ammas-kitchen.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


// Import Routes
const expenseRoutes = require("./routes/expenseRoutes");
const saleRoutes = require("./routes/saleRoutes");

// Define Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/sales", saleRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));



// Export for Vercel (VERY IMPORTANT)
module.exports = app;
