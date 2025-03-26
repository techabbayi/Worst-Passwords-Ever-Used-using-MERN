import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const PasswordOfTheDay = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordOfTheDay, setPasswordOfTheDay] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the current "Password of the Day" from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/ofTheDay/password-of-the-day')
      .then((response) => {
        if (response.data.passwordOfTheDay) {
          setPasswordOfTheDay(response.data.passwordOfTheDay);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching Password of the Day');
      });
  }, []);

  // Handle form submission to set the Password of the Day
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      // Post the password to the backend
      await axios.post('http://localhost:8000/ofTheDay/password-of-the-day', {
        password,
        username,
      });

      // Clear form and reset states after successful submission
      setPassword('');
      setUsername('');
      setError('');
      setSuccess('Password of the Day set successfully!');

      // Fetch the updated Password of the Day after submission
      const response = await axios.get('http://localhost:8000/ofTheDay/password-of-the-day');
      setPasswordOfTheDay(response.data.passwordOfTheDay);
    } catch (err) {
      console.error(err);
      setError('Error submitting the Password of the Day');
      setSuccess('');
    }
  };

  return (
    <div className="password-of-the-day">
      <h2>Set Password of the Day</h2>
      
      {/* Form for setting the Password of the Day */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username (Optional):</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">Set Password of the Day</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="current-password-of-the-day">
        <h3>Current Password of the Day</h3>
        {passwordOfTheDay ? (
          <div>
            <p><strong>Password:</strong> {passwordOfTheDay}</p>
          </div>
        ) : (
          <p>No Password of the Day has been set yet.</p>
        )}
      </div>
    </div>
  );
};

export default PasswordOfTheDay;
