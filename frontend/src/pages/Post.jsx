import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams(); 
  const [post, setPost] = useState();
  const [comments, setComments] = useState(); 
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setComments(data.comments || []); 
      })
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You must be logged in to comment");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments([...comments, data]); 
        setNewComment("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.image} alt="Blog Cover" className="w-full rounded-lg" />
      <p className="mt-4 text-lg">{post.content}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-2">
                <strong>{comment.username}</strong>: {comment.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
          Add Comment
        </button>
      </form>
    </div>
  );
}
