const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPost);  // Only authenticated users can create posts
router.get('/', getAllPosts);  // Anyone can read posts

module.exports = router;
