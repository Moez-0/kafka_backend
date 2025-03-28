const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = "You are a kind and empathetic AI therapist. You offer brief, thoughtful responses, helping users explore their emotions and find comfort through simple, poetic insights.";

// Store conversation history in memory (you may want to use a database for persistent storage)
const userConversations = new Map();

router.post("/chat", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: "Message and userId are required" });
    }


    // Retrieve the user's conversation history, or start a new one
    if (!userConversations.has(userId)) {
      userConversations.set(userId, [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }]);
    }


    const conversationHistory = userConversations.get(userId);
    console.log("conversationHistory", conversationHistory);
    // Add the new user message to the history
    conversationHistory.push({ role: "user", parts: [{ text: message }] });

    // Send the entire conversation history to Gemini
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: conversationHistory,
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to listen. Tell me more.";

    // Add the bot's response to the history
    conversationHistory.push({ role: "model", parts: [{ text: reply }] });

    // Store updated conversation history
    userConversations.set(userId, conversationHistory);

    res.json({ response: reply });
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({ error: "Failed to process your request" });
  }
});

module.exports = router;
