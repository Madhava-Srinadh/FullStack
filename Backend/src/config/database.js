require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://madhavasrinadh:Srinadh1699@mongo-cluster.or7d0.mongodb.net/RestaurantsDb?retryWrites=true&w=majority"
    );
    ("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
