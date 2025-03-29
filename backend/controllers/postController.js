const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, image, author } = req.body;
        const newPost = new Post({
            title,
            content,
            image,
            author
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};

const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Error fetching post", error: error.message });
    }
};

// Likes count
const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;  // Get Post ID from URL
        const userId = req.user.id;  // Get User ID from JWT token

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Check if user already liked the post
        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            // If already liked, remove like (Unlike)
            post.likes = post.likes.filter(uid => uid.toString() !== userId);
        } else {
            // If not liked, add like
            post.likes.push(userId);
        }

        await post.save();  // Save changes

        res.status(200).json({ likes: post.likes.length });  // Send updated like count
    } catch (error) {
        res.status(500).json({ message: "Error toggling like", error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    toggleLike,
    getSinglePost
};