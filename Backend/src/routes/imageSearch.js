const express = require("express");
const router = express.Router();
const multer = require("multer");
const { detectCuisine } = require("../controllers/imageSearchController"); // ✅ Ensure correct import
const Restaurant = require("../models/Restaurant");

// Multer setup (store image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  POST /api/image-search - Detect cuisine & return matching restaurant IDs
router.post("/image-search", upload.single("image"), async (req, res) => {
  try {
    console.log("Received file:", req.file); // ✅ Log file data

    const cuisineResponse = await detectCuisine(req);
    if (cuisineResponse.error) {
      return res.status(400).json({ error: cuisineResponse.error });
    }

    const cuisineType = cuisineResponse.cuisine;
    if (!cuisineType) {
      return res.status(400).json({ error: "Cuisine detection failed" });
    }

    // Fetch ALL matching restaurants and sort by rating
    const restaurants = await Restaurant.find({
      cuisines: new RegExp(cuisineType, "i"),
    }).sort({ "user_rating.aggregate_rating": -1 });

    const restaurantIds = restaurants.map((r) => r.id);

    res.json({ detectedCuisine: cuisineType, restaurantIds });
  } catch (error) {
    console.error("❌ Error processing image:", error);
    res.status(500).json({ error: "Failed to detect cuisine" });
  }
});

module.exports = router;
