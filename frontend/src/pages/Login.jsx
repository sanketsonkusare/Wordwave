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
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(FormData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); 
                navigate("/");
            } else{
                alert(data.message || "Login failed");
            }
        } catch(error) {
            console.error("Error logging in: ", error);
        }
    };
    return (
        <>
             <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded mb-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full rounded mb-2" required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
        </>
    );
}