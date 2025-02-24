import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router";
import {
  fetchRestaurants,
  fetchMoreRestaurants,
  resetRestaurants,
} from "../constants/restaurantSlice";
import {
  fetchRestaurantsByLocation,
  clearLocationResults,
} from "../constants/locationSlice";
import {
  fetchRestaurantsByImage,
  clearImageResults,
} from "../constants/imageSearchSlice";
import { setSearching } from "../constants/searchSlice"; // Import the new action
import Loader from "./Loader";
import { FaSearchLocation, FaImage, FaHome, FaArrowDown } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
const Body = () => {
  const dispatch = useDispatch();

  // Redux states
  const {
    list: restaurants,
    loading: loadingRestaurants,
    error: errorRestaurants,
  } = useSelector((state) => state.restaurants);
  const {
    list: locationResults,
    loading: loadingLocation,
    error: errorLocation,
  } = useSelector((state) => state.locationRestaurants);
  const {
    list: imageResults,
    detectedFood,
    loading: loadingImage,
    error: errorImage,
  } = useSelector((state) => state.imageSearchRestaurants);
  const isSearching = useSelector((state) => state.search.isSearching); // Get isSearching from Redux

  // Local states for inputs
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [radius, setRadius] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Fetch initial restaurants on mount
  useEffect(() => {
    dispatch(fetchRestaurants(1));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchMoreRestaurants(restaurants.length / 10 + 1));
  };

  const handleLocationSearch = () => {
    if (!lat || !lon || !radius) {
      alert("Please enter latitude, longitude, and radius");
      return;
    }
    dispatch(setSearching(true)); // Set isSearching via Redux
    dispatch(clearImageResults());
    dispatch(fetchRestaurantsByLocation({ lat, lon, radius }));
    setLat("");
    setLon("");
    setRadius("");
  };

  const handleImageSearch = () => {
    if (!imageFile) {
      alert("Please select an image");
      return;
    }
    dispatch(setSearching(true)); // Set isSearching via Redux
    dispatch(clearLocationResults());
    dispatch(clearImageResults());
    const formData = new FormData();
    formData.append("image", imageFile);
    dispatch(fetchRestaurantsByImage(formData));
    setImageFile(null);
  };

  const handleHomeClick = () => {
    dispatch(setSearching(false)); // Reset isSearching via Redux
    dispatch(clearLocationResults());
    dispatch(clearImageResults());
    dispatch(resetRestaurants());
    dispatch(fetchRestaurants(1));
  };

  const results = isSearching
    ? locationResults?.length > 0
      ? locationResults
      : imageResults || []
    : restaurants || [];

  const displayError =
    !results.length &&
    (isSearching ? errorLocation || errorImage : errorRestaurants);

  return (
    <div className="h-screen bg-peach-100 flex items-center justify-center overflow-hidden p-6">
      <div className="container mx-auto w-full max-w-6xl h-full flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white rounded-2xl shadow-lg p-6 flex-shrink-0">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition"
            />
            <input
              type="number"
              placeholder="Radius (km)"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition"
            />
            <button
              onClick={handleLocationSearch}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
            >
              <FaSearchLocation /> Search by Location
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <label className="w-48 p-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <span className="text-gray-600">Choose File</span>
            </label>
            <button
              onClick={handleImageSearch}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
            >
              <FaImage /> Search by Image
            </button>
          </div>
        </div>

        {detectedFood && isSearching && (
          <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 flex items-center gap-3 flex-shrink-0">
            <MdRestaurant className="text-orange-600 text-2xl" />
            <p className="text-xl text-gray-800">
              Detected Cuisine:{" "}
              <span className="font-semibold text-orange-600">
                {detectedFood}
              </span>
            </p>
          </div>
        )}

        {(loadingRestaurants || loadingLocation || loadingImage) && (
          <div className="flex-grow flex items-center justify-center">
            <Loader />
          </div>
        )}

        {displayError && (
          <div className="bg-red-100 p-4 rounded-2xl text-red-600 mb-6 flex-shrink-0">
            {displayError}
          </div>
        )}

        <div className="flex-grow overflow-y-auto no-scrollbar">
          {results.length > 0 && isSearching && (
            <div className="mb-4 flex justify-center">
              <button
                onClick={handleHomeClick}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FaHome className="text-1xl mr-2" /> Home
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {Array.isArray(results) && results.length > 0
              ? results.map((restaurant) => (
                  <div key={restaurant.id} className="w-1/4 flex-shrink-0">
                    <Link to={`/restaurants/${restaurant.id}`}>
                      <RestaurantCard resData={restaurant} />
                    </Link>
                </div>
                ))
              : !loadingRestaurants &&
                !loadingLocation &&
                !loadingImage && (
                  <p className="text-center text-gray-500">
                    No restaurants found. Try adjusting your search.Click on FoodXplorer logo to go back Home.
                  </p>
              )}
          </div>

          {!isSearching && restaurants?.length > 0 && !loadingRestaurants && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="bg-orange-500 text-white px-8 py-3 mb-16 rounded-lg hover:bg-orange-600 transition flex items-center"
              >
                <FaArrowDown /> Show More
              </button>
            </div>
          )}
          <div className="mb-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
