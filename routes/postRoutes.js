const express = require('express');
const router = express.Router();
const { createPost, getPosts  ,getPostsByUser , deletePost,updatePost} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/user/:userId', getPostsByUser);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);


  
module.exports = router;
