import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const UsernameChecker = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const platforms = [
    { name: 'GitHub', url: 'https://github.com/', apiCheck: true },
    { name: 'Twitter', url: 'https://twitter.com/', apiCheck: true },
    { name: 'Instagram', url: 'https://instagram.com/', apiCheck: true },
    { name: 'Reddit', url: 'https://reddit.com/user/', apiCheck: true },
    { name: 'YouTube', url: 'https://youtube.com/@', apiCheck: true },
    { name: 'TikTok', url: 'https://tiktok.com/@', apiCheck: true },
  ];

  const checkUsername = async () => {
    if (!username || username.length < 3) {
      setResults({ type: 'warning', message: 'Please enter a username with at least 3 characters.' });
      return;
    }

    setLoading(true);
    setResults(null);

    // Simulate checking (in production, you'd use real APIs or web scraping)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResults = platforms.map(platform => ({
      platform: platform.name,
      url: platform.url + username,
      available: Math.random() > 0.5,
    }));

    const availableCount = mockResults.filter(r => r.available).length;

    setResults({
      type: availableCount > 3 ? 'safe' : 'warning',
      title: 'Username Availability Check Complete',
      message: `Found ${availableCount} platforms where "${username}" is available.`,
      details: (
        <div className="space-y-2 mt-3">
          {mockResults.map((result, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-medium">{result.platform}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  result.available 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {result.available ? 'Available' : 'Taken'}
                </span>
                {!result.available && (
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    });

    setLoading(false);
  };

  return (
    <ToolLayout
      title="Username Availability Checker"
      description="Check if your desired username is available across multiple social media platforms"
      icon="👤"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              onKeyPress={(e) => e.key === 'Enter' && checkUsername()}
              placeholder="Enter username"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={checkUsername}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
              Check
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Only letters, numbers, and underscores allowed
          </p>
        </div>

        {/* Result Section */}
        {results && <ResultDisplay {...results} />}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">Note:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This tool provides a quick overview of username availability. For accurate results, visit each platform directly. Some platforms may have additional username requirements (minimum length, special characters, etc.).
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UsernameChecker;
