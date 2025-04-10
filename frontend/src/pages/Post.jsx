import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams(); 
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem("token");
  const userIdFromToken = token ? JSON.parse(atob(token.split(".")[1])).id : null;
  const hasLiked = userIdFromToken ? likes.map(String).includes(userIdFromToken) : false;
  
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
  if (!likes) return <p className="text-center mt-6">Loading likes...</p>;
  if (!comments) return <p className="text-center mt-6">Loading comments...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center my-6">{post.title}</h1> 
      <img src={post.image} alt="Blog Cover" className="w-full h-110 object-cover rounded-2xl" />
      <div className="flex justify-end">
        <div onClick={handleLike} className="mt-4 ml-auto cursor-pointer flex items-center">
          {hasLiked ? (
            <i className="fa-solid fa-heart text-red-500"></i>
          ) : (
            <i className="fa-regular fa-heart text-gray-300"></i> 
          )}
          <span className="ml-2">{likes.length}</span>
        </div>
      </div>
      <p className="mt-4 text-lg text-left" >{post.content}</p>

      <div className="mt-6">
        <h2 className="text-xl text-left font-semibold mt-8 mb-4">Comments:</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl shadow-md bg-[#0a0018] flex flex-col justify-between text-left"
              >
                <div className="mb-2">
                  <strong className="block text-white mb-2">{comment.username}</strong>
                  <p className="text-white-300">{comment.comment}</p>
                </div>
                {comment.userId === userIdFromToken && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:underline self-end"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-8 flex flex-col items-left">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <input
              type="text"
              className="border p-3 w-full rounded-xl"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#3b3346] text-white rounded-xl hover:bg-[#4c3e57] transition text-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
