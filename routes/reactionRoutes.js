// routes/reactionRoutes.js
const express = require("express");
const router = express.Router();
const { addOrRemoveReaction, getReactions } = require("../controllers/reactionController");
const authMiddleware = require('../middleware/authMiddleware');

// Protect the reaction routes with authMiddleware
router.post("/:postId", addOrRemoveReaction);
router.get("/:postId", getReactions);

module.exports = router;
