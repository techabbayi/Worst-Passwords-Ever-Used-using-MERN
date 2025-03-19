import React from 'react';

const PasswordCard = ({ password, strength, username, submissionDate, votes, comments }) => {
  const maskedPassword = `${'*'.repeat(password.length - 4)}${password.slice(-4)}`;

  const strengthColor = strength === 'Weak' ? 'red' : strength === 'Medium' ? 'orange' : 'green';

  return (
    <div className="password-card">
      <div className="card-header">
        <h3>{username}</h3>
        <p>{new Date(submissionDate).toLocaleString()}</p>
      </div>
      <div className="password-info">
        <p className="password-text">{maskedPassword}</p>
        <div className="strength" style={{ backgroundColor: strengthColor }}>
          {strength}
        </div>
      </div>
      <div className="card-footer">
        <button onClick={() => alert('Liked!')}>👍 Like ({votes})</button>
        <button onClick={() => alert('Comments!')}>💬 Comments ({comments.length})</button>
      </div>
    </div>
  );
};

export default PasswordCard;
