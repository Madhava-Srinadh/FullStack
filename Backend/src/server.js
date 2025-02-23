const express = require("express");
const cors = require("cors");
const connectDb = require("./config/database");
const restaurantRoutes = require("./routes/restaurants");
const imageSearchRoutes = require("./routes/imageSearch");

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
