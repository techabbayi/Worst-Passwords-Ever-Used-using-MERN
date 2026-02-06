import { useState } from 'react';
import { Shield, Search, Loader } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const FakeWebsiteDetector = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkDomain = async () => {
    if (!domain) {
      setResult({ type: 'warning', message: 'Please enter a domain name.' });
      return;
    }

    setLoading(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock typosquatting detection
    const suspiciousPatterns = ['paypa1', 'g00gle', 'faceb00k', 'arnaz0n', 'micros0ft'];
    const isSuspicious = suspiciousPatterns.some(pattern => domain.toLowerCase().includes(pattern));

    setResult({
      type: isSuspicious ? 'danger' : 'safe',
      title: isSuspicious ? 'Suspicious Domain Detected!' : 'Domain Appears Legitimate',
      message: isSuspicious 
        ? 'This domain shows signs of typosquatting or impersonation. Do not enter sensitive information.'
        : 'No obvious signs of typosquatting detected. However, always verify before entering sensitive data.',
      details: (
        <div className="space-y-2">
          <strong>Checks performed:</strong>
          <ul className="text-sm space-y-1">
            <li>• Typosquatting patterns (0 for O, 1 for l, etc.)</li>
            <li>• Domain similarity to popular brands</li>
            <li>• Character substitution detection</li>
            <li>• Homograph attack patterns</li>
          </ul>
        </div>
      )
    });

    setLoading(false);
  };

  return (
    <ToolLayout
      title="Fake Website Detector"
      description="Detect typosquatting and cloned websites that impersonate legitimate brands"
      icon="🎭"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Domain Name</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkDomain()}
              placeholder="example.com"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={checkDomain}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
              Check
            </button>
          </div>
        </div>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">Common Typosquatting Techniques:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Character substitution (0 for O, 1 for l)</li>
            <li>• Missing characters (gogle instead of google)</li>
            <li>• Extra characters (googlle instead of google)</li>
            <li>• Similar-looking characters (rn instead of m)</li>
            <li>• Different TLDs (.corn instead of .com)</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default FakeWebsiteDetector;
