const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = "You are a kind and empathetic AI therapist. You offer brief, thoughtful responses, helping users explore their emotions and find comfort through simple, poetic insights.";

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "user", parts: [{ text: message }] },
      ],
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to listen. Tell me more.";

    res.json({ response: reply });
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({ error: "Failed to process your request" });
  }
});

module.exports = router;
