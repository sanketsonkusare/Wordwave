import { useState, useEffect } from "react";
export default function Home() {

    const [Posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch ("http://localhost:5000/posts")
        .then((response) => response.json())
        .then((data)=> setPosts(data))
        .catch((error) => console.error("Error fetching posts", error));
    },[]);
    return (
        <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">Latest Blog Posts</h1>

      {Posts.length === 0 ? (
        <p className="text-center">No posts available</p>
      ) : (
        <div className="grid gap-6">
          {Posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    );
}