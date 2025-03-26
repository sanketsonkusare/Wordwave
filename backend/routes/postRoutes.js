const express = require('express');
const { createPost, getAllPosts, toggleLike } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPost);  // Only authenticated users can create posts
router.post('/:id/like', authMiddleware, toggleLike); //Only authenticated users can like or unlike a post
router.get('/', getAllPosts);  // Anyone can read posts

module.exports = router;
