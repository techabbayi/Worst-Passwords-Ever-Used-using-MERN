import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full px-4 sm:px-6 py-4 bg-gray-800 dark:bg-gray-800 transition-colors duration-300">
      <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
        🔐 Worst Passwords
      </Link>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Navigation Links */}
        <Link 
          to="/security-education" 
          className="text-gray-300 hover:text-blue-400 transition-colors"
        >
          Learn
        </Link>
        <Link 
          to="/security-tools-hub" 
          className="text-gray-300 hover:text-blue-400 transition-colors"
        >
          Security Hub
        </Link>
        <Link 
          to="/security-tools" 
          className="text-gray-300 hover:text-blue-400 transition-colors"
        >
          Tools
        </Link>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-yellow-400 dark:text-blue-300 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <>
            <span className="text-gray-300 dark:text-gray-300">Welcome, {user.username || user.name}</span>
            <Link 
              to="/dashboard" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Dashboard
            </Link>
            <button 
              onClick={logout} 
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 dark:bg-gray-800 md:hidden shadow-lg z-50 transition-all duration-300">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {/* Navigation Links */}
            <Link 
              to="/security-education" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 text-center py-2 transition-colors"
            >
              📚 Learn Security
            </Link>
            <Link 
              to="/security-tools-hub" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 text-center py-2 transition-colors"
            >
              🛡️ Security Hub
            </Link>
            <Link 
              to="/security-tools" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 text-center py-2 transition-colors"
            >
              🛠️ Security Tools
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-yellow-400 dark:text-blue-300 transition-all"
            >
              <span>Toggle Theme</span>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <span className="text-gray-300 text-center">Welcome, {user.username || user.name}</span>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-400 hover:text-blue-300 text-center py-2 transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-400 hover:text-blue-300 text-center py-2 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-center transition-colors"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;