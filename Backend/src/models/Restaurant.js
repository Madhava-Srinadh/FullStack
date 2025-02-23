// src/models/Restaurant.js
const mongoose = require("mongoose");

// Sub-schema for user rating
const userRatingSchema = new mongoose.Schema(
  {
    aggregate_rating: { type: String },
    rating_text: { type: String },
    rating_color: { type: String },
    votes: { type: String },
  },
  { _id: false }
);

// Sub-schema for location
const locationSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    locality: { type: String },
    locality_verbose: { type: String },
    city: { type: String, required: true },
    city_id: { type: Number },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    zipcode: { type: String },
    country_id: { type: Number, required: true },
  },
  { _id: false }
);

// Main Restaurant Schema
const restaurantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Unique is enough
    name: { type: String, required: true },
    url: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+$/.test(v);
        },
        message: "Invalid URL format",
      },
    },
    cuisines: { type: String, required: true },
    average_cost_for_two: { type: Number, required: true, min: 0 },
    price_range: { type: Number, required: true, min: 1, max: 4 },
    currency: { type: String, required: true },
    has_online_delivery: { type: Number, required: true },
    has_table_booking: { type: Number, required: true },
    is_delivering_now: { type: Number, required: true },
    location: { type: locationSchema, required: true },
    user_rating: { type: userRatingSchema, required: true },
    featured_image: { type: String },
    thumb: { type: String },
    photos_url: { type: String },
    menu_url: { type: String },
    events_url: { type: String },
    deeplink: { type: String },
    switch_to_order_menu: { type: Number },
    apikey: { type: String },
    R: {
      res_id: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
