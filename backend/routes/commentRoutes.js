const express = require('express');
const {addComment, getCommentsByPost, deleteComment} = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get('/:postId', getCommentsByPost);
router.delete('./:commentId', authMiddleware, deleteComment);

module.exports = router;