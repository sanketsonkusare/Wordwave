import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [FormData, setFormData] = useState({username: "", email: "", password: ""});
    const navigate= useNavigate();

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(FormData),
            });

            const data= await response.json();
            if(response.ok) {
                alert("Signup successful Please login.");
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch(error) {
            console.error("Error signing up: ", error);
        }
    };
    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Signup</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full rounded mb-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded mb-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full rounded mb-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
        </>
    );
}