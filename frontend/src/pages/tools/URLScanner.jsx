import { useState } from 'react';
import { Search, Loader, ExternalLink } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const scanURL = async () => {
    if (!url) {
      setResult({ type: 'warning', message: 'Please enter a valid URL.' });
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (e) {
      setResult({ type: 'warning', message: 'Please enter a valid URL format.' });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate scanning (in production, integrate with VirusTotal, Google Safe Browsing, etc.)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock result
    const isSafe = !url.toLowerCase().includes('phish') && !url.toLowerCase().includes('malware');
    const riskScore = isSafe ? Math.random() * 30 : 60 + Math.random() * 40;
    
    const checks = [
      { name: 'Phishing Detection', passed: isSafe, description: isSafe ? 'No phishing indicators found' : 'Possible phishing site detected' },
      { name: 'Malware Check', passed: isSafe, description: isSafe ? 'No malware detected' : 'Potential malware detected' },
      { name: 'SSL Certificate', passed: url.startsWith('https'), description: url.startsWith('https') ? 'Valid SSL certificate' : 'No SSL certificate' },
      { name: 'Reputation Score', passed: riskScore < 50, description: `Risk score: ${riskScore.toFixed(0)}/100` },
    ];

    setResult({
      type: isSafe && url.startsWith('https') ? 'safe' : isSafe ? 'warning' : 'danger',
      title: isSafe && url.startsWith('https') ? 'URL Appears Safe' : isSafe ? 'Proceed with Caution' : 'Warning: Potentially Dangerous URL',
      message: isSafe && url.startsWith('https') 
        ? 'This URL passed all safety checks. However, always exercise caution when visiting unknown websites.'
        : isSafe 
        ? 'This URL appears safe but lacks HTTPS encryption. Avoid entering sensitive information.'
        : 'This URL has been flagged as potentially dangerous. Do not visit this site or enter any personal information.',
      details: (
        <div className="space-y-2 mt-3">
          <div className="font-semibold mb-2">Security Checks:</div>
          {checks.map((check, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
              <span className="text-sm">{check.name}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  check.passed 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {check.passed ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
            </div>
          ))}
          <div className="text-xs mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            <strong>Details:</strong>
            <ul className="mt-1 space-y-1">
              {checks.map((check, idx) => (
                <li key={idx}>• {check.description}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    });

    setLoading(false);
  };

  return (
    <ToolLayout
      title="URL Safety Checker"
      description="Scan URLs for phishing, malware, and suspicious content"
      icon="🔗"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">URL to Scan</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && scanURL()}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={scanURL}
              disabled={loading}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
              Scan
            </button>
          </div>
        </div>

        {/* Result Section */}
        {result && <ResultDisplay {...result} />}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">What we check:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• <strong>Phishing indicators:</strong> Suspicious domain patterns and known phishing sites</li>
            <li>• <strong>Malware presence:</strong> Known malware distribution sites</li>
            <li>• <strong>SSL/TLS certificate:</strong> Valid HTTPS encryption</li>
            <li>• <strong>Domain reputation:</strong> Age, registrar, and historical data</li>
          </ul>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              <strong>Note:</strong> This is a demonstration tool. For production use, integrate with services like VirusTotal, Google Safe Browsing API, or URLScan.io.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default URLScanner;
