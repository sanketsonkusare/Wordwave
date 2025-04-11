import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#161020] p-8 px-14 rounded-[1.5rem] text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold flex items-center">
      <img src="/V-removebg-preview.png" alt="Logo" className="h-8 w-8 mr-2" />
      Wordwave
      </Link>

      <div>
        {user ? (
          <>
            <span className="px-2">Welcome, <b>{user.username}</b></span>
            <Link to="/create-post" className="bg-[#3b3346] px-4 py-2 mx-4 rounded-full hover:bg-[#4c3e57] transition">
             Create Post
            </Link>
            <button onClick={logout} className="bg-[#3b3346] px-4 py-2 rounded-full cursor-pointer hover:bg-[#4c3e57] transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-[#3b3346] px-4 py-2 mx-4 rounded-full hover:bg-[#4c3e57] transition">Login</Link>
            <Link to="/signup" className="bg-[#3b3346] px-4 py-2 rounded-full cursor-pointer hover:bg-[#4c3e57] transition">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
