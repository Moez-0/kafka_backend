// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const { addComment, getComments ,deleteComment } = require("../controllers/commentController");
const authMiddleware = require('../middleware/authMiddleware');

// Protect the comment routes with authMiddleware
router.post("/:postId", addComment);
router.get("/:postId", getComments);
router.delete("/:commentId",deleteComment);
module.exports = router;
