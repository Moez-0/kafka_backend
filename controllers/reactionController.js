const Reaction = require('../models/Reaction');


// Add or remove reaction (like/dislike)
exports.addOrRemoveReaction = async (req, res) => {
  const { postId } = req.params;
  const { userId, type } = req.body;

  try {
    const existingReaction = await Reaction.findOne({ post: postId, user: userId });

    if (existingReaction) {
      // If reaction already exists, update or remove
      if (existingReaction.type === type) {
        await Reaction.deleteOne({ _id: existingReaction._id }); // Remove reaction
        return res.json({ msg: "Reaction removed!" });
      } else {
        existingReaction.type = type; // Update reaction type
        await existingReaction.save();
        return res.json({ msg: "Reaction updated!" });
      }
    } else {
      // If no reaction exists, create a new one
      const newReaction = new Reaction({
        user: userId,
        post: postId,
        type: type,
      });
      await newReaction.save();
      return res.json({ msg: "Reaction added!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get reactions for a post (likes and dislikes count)
exports.getReactions = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Reaction.find({ post: postId, type: 'like' });
    const dislikes = await Reaction.find({ post: postId, type: 'dislike' });

    res.json({ likes: likes.length, dislikes: dislikes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
