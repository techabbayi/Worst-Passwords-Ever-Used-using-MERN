import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordOfTheDay = ({ showForm = true, setShowModal }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordOfTheDay, setPasswordOfTheDay] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPasswordOfTheDay();
  }, []);

  const fetchPasswordOfTheDay = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ofTheDay/password-of-the-day');
      if (response.data.passwordOfTheDay) {
        setPasswordOfTheDay(response.data.passwordOfTheDay);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching Password of the Day');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      await axios.post('http://localhost:8000/ofTheDay/password-of-the-day', {
        password,
        username,
      });

      setPassword('');
      setUsername('');
      setSuccess('Password of the Day set successfully!');
      fetchPasswordOfTheDay();

      // Close the form/modal after short delay
      if (setShowModal) {
        setTimeout(() => {
          setShowModal(false);
        }, 500);
      }

    } catch (err) {
      console.error(err);
      setError('Error submitting the Password of the Day');
    }
  };

  return (
    <div className="w-full max-w-xl bg-gray-800 p-6 rounded-xl shadow-xl text-white mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Password of the Day 🔐</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="text"
              id="password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-1">Username (Optional)</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      )}

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-400 text-sm mb-2">{success}</p>}

      <div className="mt-4">
        {passwordOfTheDay ? (
          <div className="bg-gray-700 p-4 rounded text-center">
            <span className="text-gray-300">Today's password is:</span>
            <p className="text-xl font-semibold text-yellow-400 mt-2">{passwordOfTheDay}</p>
          </div>
        ) : (
          <p className="text-gray-400">No Password of the Day has been set yet.</p>
        )}
      </div>
    </div>
  );
};

export default PasswordOfTheDay;