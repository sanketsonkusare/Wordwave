import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Wordwave</Link>

      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome!</span>
            <Link to="/create-post" className="bg-blue-500 px-4 py-2 rounded-md">
             Create Post
            </Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-500 px-4 py-2 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
