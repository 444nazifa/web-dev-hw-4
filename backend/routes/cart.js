import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Create cart
router.post("/", async (req, res) => {
  const cart = await Cart.create({ items: [] });
  res.status(201).json(cart);
});

// Get cart
router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  res.json(cart);
});

// Update cart (IMPORTANT FIX)
router.put("/:id", async (req, res) => {
  if (!Array.isArray(req.body.items)) {
    return res.status(400).json({ message: "items must be an array" });
  }

  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = req.body.items;
  await cart.save();

  res.json(cart);
});

// Clear cart
router.delete("/:id", async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    { items: [] },
    { new: true }
  );

  if (!cart) return res.status(404).json({ message: "Cart not found" });
  res.json(cart);
});

export default router;
