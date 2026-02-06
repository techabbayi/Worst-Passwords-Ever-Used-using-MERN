import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const BreachChecker = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkBreach = async () => {
    if (!email) {
      setResult({ type: 'warning', title: 'Invalid Input', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Using Have I Been Pwned API
      const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
        headers: {
          'User-Agent': 'CyberSecurityHub'
        }
      });

      if (response.status === 404) {
        setResult({
          type: 'safe',
          title: 'Good News!',
          message: 'This email address has not been found in any known data breaches.',
          details: 'However, always stay vigilant and use strong, unique passwords for each account.'
        });
      } else if (response.ok) {
        const breaches = await response.json();
        setResult({
          type: 'danger',
          title: 'Breach Detected!',
          message: `This email was found in ${breaches.length} data breach(es).`,
          details: (
            <div>
              <p className="mb-2"><strong>Breached services:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                {breaches.slice(0, 5).map((breach, idx) => (
                  <li key={idx}>{breach.Name} ({new Date(breach.BreachDate).getFullYear()})</li>
                ))}
                {breaches.length > 5 && <li>...and {breaches.length - 5} more</li>}
              </ul>
              <p className="mt-3">
                <strong>Recommendation:</strong> Change your passwords immediately on these services and enable two-factor authentication (2FA).
              </p>
            </div>
          )
        });
      } else {
        throw new Error('Unable to check breach status');
      }
    } catch {
      setResult({
        type: 'warning',
        title: 'Service Unavailable',
        message: 'Unable to check breach status at this time. The API may be rate-limited or temporarily unavailable.',
        details: 'Please try again later or visit haveibeenpwned.com directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Have I Been Pwned Checker"
      description="Check if your email address or password has been compromised in a data breach"
      icon="🔍"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkBreach()}
              placeholder="example@email.com"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={checkBreach}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
              Check
            </button>
          </div>
        </div>

        {/* Result Section */}
        {result && <ResultDisplay {...result} />}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Checks against the Have I Been Pwned database</li>
            <li>• Contains over 12 billion breached accounts from 600+ data breaches</li>
            <li>• Your email is securely queried and never stored</li>
            <li>• Results show which services were compromised and when</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BreachChecker;
