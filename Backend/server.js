const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/database");
const restaurantRoutes = require("./src/routes/restaurants");
const imageSearchRoutes = require("./src/routes/imageSearch");

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

// Routes
app.use("/restaurants", restaurantRoutes);
app.use("/api", imageSearchRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});
