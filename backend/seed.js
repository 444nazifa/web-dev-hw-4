import mongoose from "mongoose";
import MenuItem from "./models/MenuItem.js";

const mongoURI = "mongodb://127.0.0.1:27017/gilded_spoon";

const seedItems = [
  { name: "Roasted Tomato Soup", price: 9.0, category: "Starters" },
  { name: "Crispy Calamari", price: 14.0, category: "Starters" },
  { name: "Truffle Tagliatelle", price: 19.0, category: "Mains" },
  { name: "Midtown Smash Burger", price: 18.0, category: "Mains" },
  { name: "Basque Cheesecake", price: 9.0, category: "Desserts" },
];

const runSeed = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for seeding...");

    await MenuItem.deleteMany({});
    await MenuItem.insertMany(seedItems);

    console.log("✅ Database successfully seeded with menu items!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

runSeed();
