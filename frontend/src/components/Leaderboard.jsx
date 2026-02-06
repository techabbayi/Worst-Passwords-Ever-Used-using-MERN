import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
import API from '../api';
import Navbar from './Navbar';

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
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
          <Navbar />
        </header>
        <div className="text-center p-10 text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
          <Navbar />
        </header>
        <div className="text-center p-10 text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar />
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-500 dark:text-yellow-400" size={32} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Most Common Weak Passwords
            </h1>
          </div>
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-colors duration-300">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <p className="text-base sm:text-lg">
              These are the most commonly submitted weak passwords in our database. If your password appears on this list, 
              consider changing it immediately!
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-bold">#</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-bold">Password</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-bold">Submissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                {passwords.length > 0 ? (
                  passwords.map((item, index) => (
                    <tr 
                      key={item.password} 
                      className={`${
                        index % 2 === 0 
                          ? 'bg-white dark:bg-gray-800' 
                          : 'bg-gray-50 dark:bg-gray-750'
                      } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {index + 1 <= 3 ? (
                          <span className="flex items-center gap-2">
                            {index + 1}
                            {index === 0 && <span className="text-yellow-500">🥇</span>}
                            {index === 1 && <span className="text-gray-400">🥈</span>}
                            {index === 2 && <span className="text-orange-600">🥉</span>}
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-mono text-gray-900 dark:text-white">
                        {item.password}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {item.count}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No passwords submitted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
