const express = require('express');
const { createPost, getAllPosts, getSinglePost , toggleLike } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPost);
router.post('/:id/like', authMiddleware, toggleLike);
router.get('/:id', getSinglePost);
router.get('/', getAllPosts); 

module.exports = router;
