import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center w-full px-6 py-4">
      <h1 className="text-xl font-bold text-blue-400">🔐 Worst Passwords</h1>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user.username || user.name}</span>
            <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">Dashboard</Link>
            <button 
              onClick={logout} 
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;