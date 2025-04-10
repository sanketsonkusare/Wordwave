import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams(); 
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState();
  const token = localStorage.getItem("token");
  const userIdFromToken = token ? JSON.parse(atob(token.split(".")[1])).userId : null;
  const hasLiked = userIdFromToken ? likes.includes(userIdFromToken) : false;


  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setComments(data.comments || []);
        setLikes(data.likes || []);
      })
      .catch((err) => console.error("Error fetching post:", err));

    fetch(`http://localhost:5000/comments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data || []);
      })
      .catch((err) => console.error("Error fetching comments", err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You must be logged in to comment");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments([data, ...comments]); 
        setNewComment("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a comment");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment: ",error);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to login to like the post");
  
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedPost = await response.json();
      if(response.ok) {
        setLikes(updatedPost.likes);
      } else {
        alert(updatedPost.message || "Failed to toggle like");
      }
    } catch (error) {
      console.error("Failed to toggle like on the post", error);
    }
  };
  

  if (!post) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1> 
      <img src={post.image} alt="Blog Cover" className="w-full rounded-lg" />
      <div
        onClick={handleLike}
        className={`mt-2 px-4 py-2 rounded flex items-center justify-center ${
          hasLiked ? "bg-red-500 text-white glow" : "bg-white text-red-500 border border-red-500"}`}>
          {hasLiked ? "❤️" : "🤍"} {likes.length}
      </div>
      <p className="mt-4 text-lg">{post.content}</p>

      <div className="mt-6">
    <h2 className="text-xl font-semibold">Comments</h2>
    {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
    ) : (
        <ul>
            {comments.map((comment, index) => (
                <li key={index} className="border-b py-2 flex justify-between items-center">
                  <div>
                    <strong>{comment.username}</strong>: {comment.comment}
                  </div>
                  {comment.useId === userIdFromToken && (
                    <button onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:underline">
                      Delete
                    </button>
                  )}
                </li>
            ))}
        </ul>
    )}

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
    </div>
  );
}
