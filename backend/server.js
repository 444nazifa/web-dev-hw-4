import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";
import cartRoutes from "./routes/cart.js";

const app = express();

app.use(cors());
app.use(express.json()); // must be before routes

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Missing MONGO_URI environment variable");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => res.send("Backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
