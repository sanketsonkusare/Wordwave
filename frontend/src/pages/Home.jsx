import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home() {

    const [Posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch ("http://localhost:5000/posts")
        .then((response) => response.json())
        .then((data)=> setPosts(data))
        .catch((error) => console.error("Error fetching posts", error));
    },[]);
    return (
        <div className="max-w-8xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">Latest Blog Posts</h1>

      {Posts.length === 0 ? (
        <p className="text-center">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {Posts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="border p-4 py-6 rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-xl font-semibold py-2">{post.title}</h2>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
    );
}