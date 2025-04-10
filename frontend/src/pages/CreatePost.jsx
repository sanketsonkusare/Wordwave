import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState("");
    const navigate = useNavigate();

    const handleCreatePost = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization" : `Bearer ${token}`,
            },
            body: JSON.stringify({title: Title,content: Content,image: Image})
        });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message || "Failed to create post");
        } else {
            alert("Post created successfully");
            navigate("/");
        }
    }
    return (
        <>
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded mb-3"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-3"
          value={Image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
        </>
    );
}