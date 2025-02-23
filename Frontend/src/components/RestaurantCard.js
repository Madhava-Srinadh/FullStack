const RestaurantCard = ({ resData }) => {
  const { name, cuisines, average_cost_for_two, currency, user_rating } =
    resData;
  const rating = user_rating?.aggregate_rating || "N/A";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
      <img
        className="w-full h-40 object-cover rounded-lg mb-4"
        alt={name}
        src={resData.featured_image || "https://via.placeholder.com/150"}
      />
      <h3 className="font-bold text-lg text-gray-800 mb-2">{name}</h3>
      <h4 className="text-sm text-gray-600 truncate mb-2">{cuisines}</h4>
      <h4 className="text-sm text-gray-600 mb-2">{rating} stars</h4>
      <h4 className="text-sm text-gray-600">
        {average_cost_for_two} {currency}
      </h4>
    </div>
  );
};

export default RestaurantCard;
