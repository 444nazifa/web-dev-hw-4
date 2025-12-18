import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";
import cartRoutes from "./routes/cart.js";

const app = express();

app.use(cors());
app.use(express.json()); // ✅ MUST be before routes

const mongoURI = "mongodb://127.0.0.1:27017/gilded_spoon";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => res.send("Backend is running"));

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
