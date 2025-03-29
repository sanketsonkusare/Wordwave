import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const [Post, setPost] = useState();
    const [Comments, setComments] = useState();
    const [newComment, setNewComment] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {setPost(data); setComments(data.Comments || [])})
        .catch((err) => console.error("Error fetching the post: ",err));
    }, [id]);

    if(!Post) return <p className="text-center mt-6">Loading...</p>;
    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{Post.title}</h1>
                <img src={Post.image} alt="Blog Cover" className="w-full rounded-lg"/>
                <p className="mt-4 text-lg">{Post.content}</p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    {Comments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        <ul>
                            {Comments.map((comment, index) => (
                                <li key={index} className="border-b py-2">
                                    <Strong>{comment.username}</Strong>: {comment.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}