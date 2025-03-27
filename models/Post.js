const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  caption: { type: String, required: true },
  songLink: { type: String, required: true },
  songUri: { type: String, required: true },
  reactions: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
},  { timestamps: true } ,);

module.exports = mongoose.model('Post', PostSchema);
