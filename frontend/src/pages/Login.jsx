import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [FormData, setFormData] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || "";
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(FormData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); 
                navigate("/");
                window.location.reload();
            } else{
                alert(data.message || "Login failed");
            }
        } catch(error) {
            console.error("Error logging in: ", error);
        }
    };
    return (
        <>
            <div className="max-w-md mx-auto mt-16 p-6 bg-[#0a0018] rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    Login
                    </button>
                </form>
            </div>
        </>
    );
}