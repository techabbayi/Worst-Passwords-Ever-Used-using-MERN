import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PasswordCard from '../components/PasswordCard';
import '../index.css';

const UserDashboard = () => {
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('userPasswords')) || [];
    setPasswords(storedPasswords);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.trim() !== '') {
      const newPassword = {
        text: password,
        strength: 'Weak',
        username: 'User123',
        date: new Date().toISOString(),
        votes: 0,
        comments: [],
      };

      const updatedPasswords = [...passwords, newPassword];
      localStorage.setItem('userPasswords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);
      setPassword('');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Your Submitted Weak Passwords</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your weak password"
        />
        <button type="submit">Submit</button>
      </form>

      <div className="password-list">
        {passwords.length > 0 ? (
          passwords.map((password, index) => (
            <PasswordCard
              key={index}
              password={password.text}
              strength={password.strength}
              username={password.username}
              submissionDate={password.date}
              votes={password.votes}
              comments={password.comments}
            />
          ))
        ) : (
          <p>No passwords submitted yet. Please add some!</p>
        )}
      </div>

      <Link to="/leaderboard">View Leaderboard</Link>
    </div>
  );
};

export default UserDashboard;
