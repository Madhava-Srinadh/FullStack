// src/scripts/loadData.js
const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const connectDb = require("../config/database"); // Move up one level to src/config/
const Restaurant = require("../models/Restaurant"); // Move up one level to src/models/

// Adjust paths to point to RestaurentData from src/scripts/
const jsonFiles = [
  path.join(__dirname, "../../RestaurentData/file1.json"),
  path.join(__dirname, "../../RestaurentData/file2.json"),
  path.join(__dirname, "../../RestaurentData/file3.json"),
  path.join(__dirname, "../../RestaurentData/file4.json"),
  path.join(__dirname, "../../RestaurentData/file5.json"),
];

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(` Error reading/parsing ${filePath}:`, err.message);
    return [];
  }
}

async function loadData() {
  await connectDb();

  try {
    for (const file of jsonFiles) {
      const jsonData = await readJsonFile(file);
      for (const data of jsonData) {
        const restaurants = data.restaurants || [];
        for (const restWrapper of restaurants) {
          const rest = restWrapper.restaurant;

          if (!rest.id || !rest.name) {
            console.warn(` Skipping restaurant with missing ID/Name:`, rest);
            continue;
          }

          const restaurantDoc = {
            id: rest.id,
            name: rest.name,
            url: rest.url,
            cuisines: rest.cuisines,
            average_cost_for_two: rest.average_cost_for_two,
            price_range: rest.price_range,
            currency: rest.currency,
            has_online_delivery: rest.has_online_delivery,
            has_table_booking: rest.has_table_booking || 0,
            is_delivering_now: rest.is_delivering_now,
            location: rest.location,
            user_rating: rest.user_rating,
            featured_image: rest.featured_image,
            thumb: rest.thumb,
            photos_url: rest.photos_url,
            menu_url: rest.menu_url,
            events_url: rest.events_url,
            deeplink: rest.deeplink,
            switch_to_order_menu: rest.switch_to_order_menu,
            apikey: rest.apikey,
            R: rest.R,
          };

          const existing = await Restaurant.findOne({ id: rest.id });

          if (existing) {
            await Restaurant.updateOne(
              { id: rest.id },
              { $set: restaurantDoc }
            );
          } else {
            const newRestaurant = new Restaurant(restaurantDoc);
            await newRestaurant.save();
          }
        }
      }
    }
  } catch (err) {
    console.error(" Error loading data:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

loadData();
