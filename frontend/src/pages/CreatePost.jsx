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
      <div className="flex items-center justify-center bg-[#0a0018]">
        <div className="max-w-lg w-full p-6 mt-16 bg-[#0a0018] shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6">Create a New Post</h2>
          <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-3 w-full rounded-lg"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              className="border p-3 w-full rounded-lg"
              value={Content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-3 w-full rounded-lg"
              value={Image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#3b3346] text-white rounded-full hover:bg-[#4c3e57] transition text-center"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    );
}