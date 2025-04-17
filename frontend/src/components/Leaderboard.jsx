import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Leaderboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/passwords');
        
        // Process passwords to get counts
        const passwordCounts = response.data.reduce((acc, curr) => {
          const password = curr.password;
          acc[password] = (acc[password] || 0) + 1;
          return acc;
        }, {});
        
        // Convert to array and sort
        const leaderboardData = Object.entries(passwordCounts)
          .map(([password, count]) => ({ password, count }))
          .sort((a, b) => b.count - a.count);
        
        setPasswords(leaderboardData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Most Common Weak Passwords</h1>
          <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white/60 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 bg-gray-800 text-white">
            <p className="text-lg">
              These are the most commonly submitted weak passwords in our database. If your password appears on this list, 
              consider changing it immediately!
            </p>
          </div>
          
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">#</th>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">Password</th>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">Submissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {passwords.length > 0 ? (
                passwords.map((item, index) => (
                  <tr key={item.password} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{item.password}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No passwords submitted yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;