import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <FaSpinner className="animate-spin text-orange-500 text-4xl" />
    </div>
  );
};

export default Loader;
