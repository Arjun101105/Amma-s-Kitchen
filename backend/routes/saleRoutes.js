const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

router.post("/", async (req, res) => {
  try {
    const { item, price, type } = req.body;
    const newSale = new Sale({
      item,
      price,
      type,
      date: new Date(),  // Store as a proper Date object
    });
    await newSale.save();
    res.json(newSale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
