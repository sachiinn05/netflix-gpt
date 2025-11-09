import { GoogleGenAI } from "@google/genai"; // ✅ FIXED import name

const GEMINI_API_KEY = "AIzaSyCSuKU-O0sFmztmtn1fX0Uq90zRORbN5XE";

const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export default gemini;
