const Post = require('../models/Post');
const moment = require("moment");


// Create a new post
exports.createPost = async (req, res) => {
  const { userId , caption, songLink, songUri } = req.body;
  console.log(req.body);
  try {
    const today = moment().startOf("day");
    const existingPost = await Post.findOne({
      user: userId,
      createdAt: { $gte: today.toDate() },
    });
    
    if (existingPost) {
      return res.status(400).json({ msg: "You can only post once per day." });
    }

    const newPost = new Post({
      user: userId,
      caption,
      songLink,
      songUri,
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get posts for a specific user by userId
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate('user', 'username');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Update a post by id
exports.updatePost = async (req, res) => {
  const { caption } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post.caption = caption;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await Post.deleteOne({ _id: req.params.id }); // Correct way to delete
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

