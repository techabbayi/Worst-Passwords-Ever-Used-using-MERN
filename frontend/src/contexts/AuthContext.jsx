import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage when the app initializes
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login user and store in localStorage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    API.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    setUser(userData);
  };

  // Logout user and clear Cookies
  const logout = async () => {
    try {
      await API.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      delete API.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };
  

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;