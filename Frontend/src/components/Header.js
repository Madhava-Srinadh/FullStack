import { FaUtensils } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-500 to-red-500 shadow-lg p-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <FaUtensils className="text-white text-2xl" />
        <h1 className="text-2xl font-bold text-white tracking-wide">
          FoodXplorer
        </h1>
      </div>
    </div>
  );
};

export default Header;
