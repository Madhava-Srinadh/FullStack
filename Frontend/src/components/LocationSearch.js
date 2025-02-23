import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsByLocation,
  clearLocationResults,
} from "../constants/locationSlice";
import RestaurantCard from "./RestaurantCard";
import Loader from "./Loader";

const LocationSearch = () => {
  const dispatch = useDispatch();
  const {
    list: locationResults,
    loading,
    error,
  } = useSelector((state) => state.locationRestaurants);

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [radius, setRadius] = useState("");

  const handleSearch = () => {
    if (!lat || !lon || !radius) {
      alert("Please enter latitude, longitude, and radius");
      return;
    }

    dispatch(fetchRestaurantsByLocation({ lat, lon, radius }));

    // ✅ Clear input fields after search
    setLat("");
    setLon("");
    setRadius("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Find Restaurants by Location</h2>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Radius (km)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Show Loader while fetching results */}
      {loading && <Loader />}

      {/* Show Error if API fails */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Show Location Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {locationResults.length > 0
          ? locationResults.map((restaurant) => (
              <RestaurantCard key={restaurant.id} resData={restaurant} />
            ))
          : !loading && (
              <p className="text-center text-gray-500 col-span-full">
                Please wait a moment,while fetching the results!...
              </p>
            )}
      </div>

      {/* Home Button to Clear Search Results */}
      {locationResults.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-500 text-white p-2 rounded-md"
            onClick={() => dispatch(clearLocationResults())}
          >
            Clear Results
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
