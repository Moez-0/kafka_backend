const Comment = require('../models/Comment');

// Add a comment to a post
exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    const newComment = new Comment({
      user: userId,
      post: postId,
      text,
    });

    await newComment.save();
    res.json({ msg: "Comment added!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate('user', 'username');
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body; // User who wants to delete the comment

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check if the user is the one who posted the comment
    if (comment.user.toString() !== userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Delete the comment using findByIdAndDelete
    await Comment.findByIdAndDelete(commentId);
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};