import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import Loader from "./Loader";
import {
  FaHome,
  FaMapMarkerAlt,
  FaImage,
  FaUtensils,
  FaMoneyBillWave,
  FaStar,
  FaLink,
} from "react-icons/fa";

const RestaurantDetail = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/restaurants/${resId}`
      );
      if (!response.ok) throw new Error("Restaurant not found");
      setResInfo(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [resId]);

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!resInfo) return null;

  const {
    name,
    cuisines,
    average_cost_for_two,
    currency,
    location,
    user_rating,
    url,
    featured_image,
  } = resInfo;

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="mb-4 flex gap-6 text-orange-600 font-semibold">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-orange-800"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/location-search"
            className="flex items-center gap-1 hover:text-orange-800"
          >
            <FaMapMarkerAlt /> Location
          </Link>
          <Link
            to="/image-search"
            className="flex items-center gap-1 hover:text-orange-800"
          >
            <FaImage /> Image
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
        {featured_image && (
          <img
            className="w-full h-56 object-cover rounded-lg mb-4"
            src={featured_image}
            alt={name}
          />
        )}

        <div className="space-y-3 text-gray-700">
          <p className="flex items-center gap-2">
            <FaUtensils className="text-orange-600" /> {cuisines}
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-orange-600" />{" "}
            {average_cost_for_two} {currency}
          </p>
          <p className="flex items-center gap-2">
            <FaStar className="text-orange-600" />{" "}
            {user_rating?.aggregate_rating || "N/A"} stars
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-600" /> {location.address},{" "}
            {location.city}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition shadow-md"
          >
            <FaLink className="mr-2" /> Visit Zomato
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
