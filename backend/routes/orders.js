import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must include items" });
    }

    const order = await Order.create({
      items: items.map(i => ({
        itemId: i.itemId || i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      status: "placed",
    });

    res.status(201).json({
      message: "Order saved",
      orderId: order._id.toString(),
    });
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

export default router;
