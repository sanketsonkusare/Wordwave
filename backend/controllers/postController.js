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

module.exports = {
    createPost,
    getAllPosts
};