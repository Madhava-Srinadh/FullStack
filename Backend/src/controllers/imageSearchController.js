const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const detectCuisine = async (req) => {
  try {
    if (!req.file) {
      return { error: "No image uploaded" };
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const imagePart = {
      inlineData: { data: base64Image, mimeType },
    };

    const prompt =
      "Identify the cuisine type of the dish in the image. Just type the cuisine type (e.g., Italian, Chinese, Mexican, etc.).";

    const result = await model.generateContent([prompt, imagePart]);
    const cuisineType = result.response.text().trim();

    return { cuisine: cuisineType }; // ✅ Only return result
  } catch (error) {
    console.error("❌ Error processing image:", error);
    return { error: "Failed to detect cuisine" };
  }
};

module.exports = { detectCuisine };
