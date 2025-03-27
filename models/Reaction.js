const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  type: { type: String, enum: ['like', 'dislike'], required: true },
});

module.exports = mongoose.model('Reaction', ReactionSchema);
