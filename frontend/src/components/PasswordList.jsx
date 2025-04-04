import React, { useEffect, useState } from 'react';
import PasswordCard from './PasswordCard';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch('http://localhost:8000/passwords');
        
        if (!response.ok) {
          throw new Error('Failed to fetch passwords');
        }

        const data = await response.json();
        setPasswords(data);
      } catch (err) {
        setError('Error fetching passwords. Please try again later.');
        alert('Error fetching passwords. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const deletePassword = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/passwords/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete password');
      }

      setPasswords(passwords.filter((password) => password._id !== id));
      alert('Password deleted successfully!');
    } catch (err) {
      setError('Error deleting password. Please try again later.');
      alert('Error deleting password. Please try again later.');
      console.error(err);
    }
  };

const updatePassword = async (id, password, username) => {
    try {
      const response = await fetch(`http://localhost:8000/passwords/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, username }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Password updated:', data);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-xl">Loading passwords...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="password-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {passwords.length === 0 ? (
        <div className="flex justify-center items-center col-span-full">
          <p className="text-white text-xl">No passwords available. Be the first to add one!</p>
        </div>
      ) : (
        passwords.map((password) => (
          <PasswordCard
            key={password._id}
            password={password.password}
            strength={password.strength || 'Weak'}
            username={password.username || 'Anonymous'}
            submissionDate={password.createdAt}
            votes={password.votes || 0}
            comments={password.comments || []}
            onDelete={() => deletePassword(password._id)}
            onUpdate={(updatedPassword) => updatePassword(password._id, updatedPassword)}
          />
        ))
      )}
    </div>
  );
};

export default PasswordList;
