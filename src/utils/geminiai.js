import { GoogleGenAI } from "@google/genai"; // ✅ FIXED import name

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export default gemini;
