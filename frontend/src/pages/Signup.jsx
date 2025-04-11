import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [FormData, setFormData] = useState({username: "", email: "", password: ""});
    const navigate= useNavigate();

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || "";
            const response = await fetch(`${API_BASE_URL}/auth/Signup`, {
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
        <div className="flex items-center justify-center bg-[#0a0018]">
            <div className="max-w-md w-full mt-16 p-6 bg-[#0a0018] rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="border p-3 w-full rounded-lg"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-3 w-full rounded-lg"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border p-3 w-full rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#3b3346] text-white rounded-full hover:bg-[#4c3e57] transition text-center"
                >
                    Signup
                </button>
                </form>
            </div>
        </div>
    );
}