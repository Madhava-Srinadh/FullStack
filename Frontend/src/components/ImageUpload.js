import { useState } from "react";
import { BASE_URL } from "../constants/constant";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [detectedFood, setDetectedFood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    setError("");
    setDetectedFood("");

    const formData = new FormData();
    formData.append("image", image);

    console.log("Uploading image:", image); // ✅ Log selected file
    console.log("FormData content:", formData.get("image")); // ✅ Log FormData

    try {
      const response = await fetch(`${BASE_URL}/api/image-search`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Log API response

      if (response.ok) {
        setDetectedFood(data.detectedCuisine);
      } else {
        setError(data.error || "Failed to detect image");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a Food Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2"
      />
      <button onClick={uploadImage} className="bg-blue-500 text-white p-2 ml-2">
        Detect Food
      </button>

      {loading && <p>Detecting...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {detectedFood && (
        <p className="text-green-500 font-bold">Detected: {detectedFood}</p>
      )}
    </div>
  );
};

export default ImageUpload;
