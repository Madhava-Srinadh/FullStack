const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// Function to calculate distance between two coordinates
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);
  lat2 = parseFloat(lat2);
  lon2 = parseFloat(lon2);

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// GET /restaurants/location - Find restaurants by latitude, longitude, and radius
// GET /restaurants/location - Find restaurants by latitude, longitude, and radius
router.get("/location", async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    const radius = parseFloat(req.query.radius) || 3;

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    const restaurants = await Restaurant.find();
    const nearby = restaurants
      .map((r) => ({
        id: r.id, //  Only include restaurant ID
        distance: haversine(
          lat,
          lon,
          r.location.latitude,
          r.location.longitude
        ),
      }))
      .filter((r) => r.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .map((r) => r.id); // Extract only IDs

    res.json({ restaurantIds: nearby });
  } catch (err) {
    console.error("Error fetching nearby restaurants:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


// Get restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ id: req.params.id });
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get list of restaurants with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const skip = (page - 1) * perPage;

    const total = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find().skip(skip).limit(perPage);

    res.json({ restaurants, total, page, per_page: perPage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
