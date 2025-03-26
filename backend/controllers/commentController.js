const Comment = require('../models/Comment');
const Post = require('../models/Post');


exports.addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.user.id;  // Get user ID from JWT
        const username = req.user.username;  // Get username from JWT

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // ✅ Make sure "comment" exists in request body
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment text is required" });
        }

        // ✅ Create and save the comment
        const newComment = new Comment({ postId, userId, username, comment });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Comment Error:", error.message);
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

exports.getCommentsByPost = async (req, res) => {
    try {
        const {postId} = req.params;
        const comments = await Comment.find({ postId }).sort({createdAt:-1});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: "Error fetching comments", error: error.message});
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);

        if(!comment) return res.status(404).json({message: "Comment not found "});

        if(comment.userId.toString() !== req.user.id) {
            return res.status(403).json({message: "Not authorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({message: "Comment deleted successfully "});
    } catch (error) {
        res.status(500).json({message: "Error deleteing comment ", error: error.message});
    }
};