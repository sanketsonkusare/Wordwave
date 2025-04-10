const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const author = req.user.id;

        if(!title || !content) {
            return res.status(400).json({message: "Title and content are required"});
        }

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
        console.log(error.message);
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
    const { id } = req.params;
    const userId = req.user.id; 
  
    try {
      const post = await Post.findById(id);
  
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((like) => like.toString() !== userId);
      } else {
        post.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json(post);
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