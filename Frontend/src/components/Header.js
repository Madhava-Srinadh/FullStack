import { FaUtensils } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchRestaurants,resetRestaurants } from "../constants/restaurantSlice";
import { clearLocationResults } from "../constants/locationSlice";
import { clearImageResults } from "../constants/imageSearchSlice";
import { setSearching } from "../constants/searchSlice"; // Import the new action

const Header = () => {
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(setSearching(false)); // Reset isSearching via Redux
        dispatch(clearLocationResults());
        dispatch(clearImageResults());
        dispatch(resetRestaurants());
        dispatch(fetchRestaurants(1));
  };
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-500 to-red-500 shadow-lg p-4 sticky top-0 z-10">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleHomeClick}
      >
        <FaUtensils className="text-white text-2xl" />
        <h1 className="text-2xl font-bold text-white tracking-wide">
          FoodXplorer
        </h1>
      </div>
    </div>
  );
};

export default Header;
