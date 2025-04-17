import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PasswordList from '../components/PasswordList';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

const getPasswordStrength = (password) => {
  if (!password) return '';
  if (password.length < 6) return 'Weak';
  if (password.length < 10) return 'Medium';
  if (!/\d/.test(password)) return 'Medium';
  return 'Strong';
};

const validatePassword = (input) => {
  if (!input) return '';
  if (input.length < 6) return 'Password must be at least 6 characters long.';
  if (!/\d/.test(input)) return 'Password must contain at least one number.';
  return '';
};

const UserDashboard = () => {
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [passwordRes, usersRes] = await Promise.all([
          API.get('/api/passwords'),
          API.get('/api/auth/users'),
        ]);
        setPasswords(passwordRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please check your connection or login again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setPasswordError(validatePassword(input));
  };

  const handleUserChange = async (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setLoading(true);
    setError('');

    try {
      const response = await API.get(
        userId ? `/api/passwords/user/${userId}` : '/api/passwords'
      );
      setPasswords(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch passwords by user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password || passwordError) {
      setError('Please fix the errors before submitting.');
      return;
    }

    try {
      const newPassword = { password, site, username };
      const response = await API.post('/api/passwords', newPassword);

      setPasswords((prev) => [response.data, ...prev]);
      setPassword('');
      setSite('');
      setUsername('');
      setPasswordError('');
      passwordInputRef.current.focus();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.errors?.map((e) => e.msg).join(', ') ||
        'Error submitting password';
      setError(msg);
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="user-dashboard flex flex-col items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 min-h-screen py-12 px-6">
      <Link to="/" className="absolute top-6 left-6 text-white text-xl font-semibold hover:underline">
        Back to Home
      </Link>

      <h2 className="text-4xl font-extrabold text-white mb-8">Your Submitted Passwords</h2>

      {/* Show submission form only if user is logged in */}
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-lg mb-8"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            ref={passwordInputRef}
            className={`w-full p-4 mb-2 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
          />
          <div className="flex justify-between mb-4">
            {password && (
              <span className="text-sm text-gray-700">
                Strength: <strong>{getPasswordStrength(password)}</strong>
              </span>
            )}
            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
          </div>

          <input
            type="text"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="Website (optional)"
            className="w-full p-4 mb-4 rounded-lg border border-gray-300"
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (optional)"
            className="w-full p-4 mb-4 rounded-lg border border-gray-300"
          />

          <button
            type="submit"
            className="w-full p-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            disabled={!!passwordError}
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div className="bg-white/30 p-6 mb-6 rounded-xl text-center text-white">
            Please login to add a password. You can still view all submitted passwords below.
          </div>
          <div className="mb-6 w-full max-w-lg">
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {passwords.length === 0 ? (
        <p className="text-white text-center text-lg">No passwords submitted yet.</p>
      ) : (
        <PasswordList passwords={passwords} />
      )}

      <Link to="/leaderboard" className="mt-8 text-white text-lg font-semibold hover:underline">
        View Leaderboard
      </Link>
    </div>
  );
};

export default UserDashboard;