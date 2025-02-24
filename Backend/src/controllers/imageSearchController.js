const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Ensure model is initialized

const detectCuisine = async (req) => {
  try {
    if (!req.file) {
      return { error: "No image uploaded" };
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const imagePart = {
      inlineData: { data: base64Image, mimeType },
    };

    const prompt =
      "Identify the cuisine type of the dish in the image. Choose one from {Continental, American, Asian, North Indian, Thai, European, Mexican, Chinese, Cafe, Desserts, Bakery, Tapas, South African, Beverages, Healthy Food, Spanish, Seafood, Belgian, Contemporary, Finger Food, International, Kiwi, Ice Cream, Fast Food, Steak, Italian, Pizza, Grill, French, Japanese}.";

    const result = await model.generateContent([prompt, imagePart]);
    console.log("Gemini API Response:", result); // ✅ Log response for debugging

    const cuisineType = result.response.text().trim();
    return { cuisine: cuisineType };
  } catch (error) {
    console.error("❌ Error processing image:", error);
    return { error: "Failed to detect cuisine" };
  }
};

module.exports = { detectCuisine }; // ✅ Ensure it's exported correctly
