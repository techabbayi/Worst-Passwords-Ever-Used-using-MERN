import React, { useState } from 'react';
import '../App.css';

const PasswordCard = ({ password, strength, username, submissionDate, votes, comments, onDelete, onUpdate }) => {
  const user = username || 'Anonymous';
  const passwordStrength = strength || 'Weak';
  const commentCount = comments ? comments.length : 0;

  const strengthColor =
    passwordStrength === 'Weak'
      ? 'bg-red-500'
      : passwordStrength === 'Medium'
      ? 'bg-orange-500'
      : 'bg-green-500';

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleUpdate = () => {
    const newPassword = prompt('Enter the new password:', password);
    if (newPassword && newPassword !== password) {
      onUpdate(newPassword);
      alert('Password updated successfully!');
    } else if (newPassword === password) {
      alert('The password is the same as the current one!');
    } else {
      alert('Update canceled.');
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this password?');
    if (confirmDelete) {
      onDelete(password);
      alert('Password deleted successfully!');
    }
  };

  return (
    <div className="password-card backdrop-blur-md bg-blue-900 bg-opacity-40 rounded-lg p-6 shadow-lg max-w-sm mx-auto my-4">
      <div className="card-header flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-semibold">{user}</h3>
        <p className="text-gray-300 text-sm">{new Date(submissionDate).toLocaleString()}</p>
      </div>

      <div className="password-info mb-4">
        <p className="password-text text-white text-lg font-mono">
          {isPasswordVisible ? password : '*'.repeat(password.length - 4) + password.slice(-4)}
        </p>
        <div className={`strength text-white rounded-full px-4 py-1 mt-2 ${strengthColor}`}>
          {passwordStrength}
        </div>
      </div>

      <div className="card-footer flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          onClick={handlePasswordVisibility}
        >
          👁️ {isPasswordVisible ? 'Hide' : 'Show'} Password
        </button>
        <div className="flex space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
            onClick={handleUpdate}
          >
            <i className="fas fa-edit"></i> Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>

      {commentCount > 0 && (
        <div className="comments mt-4">
          <h4 className="text-white text-sm font-semibold">Latest Comments:</h4>
          <ul className="text-white text-sm">
            {comments.slice(0, 3).map((comment, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{comment.username}: </span>
                <span>{comment.text}</span>
              </li>
            ))}
            {commentCount > 3 && (
              <p className="text-blue-400 text-xs mt-2">And {commentCount - 3} more comments...</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordCard;
