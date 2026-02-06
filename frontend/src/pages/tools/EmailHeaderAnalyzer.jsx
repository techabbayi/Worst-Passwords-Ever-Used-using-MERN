import { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const EmailHeaderAnalyzer = () => {
  const [headers, setHeaders] = useState('');
  const [result, setResult] = useState(null);

  const analyzeHeaders = () => {
    if (!headers) {
      setResult({ type: 'warning', message: 'Please paste email headers to analyze.' });
      return;
    }

    // Simple analysis
    const hasSPF = headers.toLowerCase().includes('spf=pass');
    const hasDKIM = headers.toLowerCase().includes('dkim=pass');
    const hasDMARC = headers.toLowerCase().includes('dmarc=pass');
    
    const passedChecks = [hasSPF, hasDKIM, hasDMARC].filter(Boolean).length;
    const type = passedChecks >= 2 ? 'safe' : passedChecks === 1 ? 'warning' : 'danger';

    setResult({
      type,
      title: 'Email Header Analysis Complete',
      message: `Passed ${passedChecks} out of 3 authentication checks.`,
      details: (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className={`p-2 rounded text-center text-sm ${hasSPF ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
              SPF {hasSPF ? '✓' : '✗'}
            </div>
            <div className={`p-2 rounded text-center text-sm ${hasDKIM ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
              DKIM {hasDKIM ? '✓' : '✗'}
            </div>
            <div className={`p-2 rounded text-center text-sm ${hasDMARC ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
              DMARC {hasDMARC ? '✓' : '✗'}
            </div>
          </div>
        </div>
      )
    });
  };

  return (
    <ToolLayout
      title="Email Header Analyzer"
      description="Analyze email headers to detect spoofing and phishing attempts"
      icon="📨"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email Headers</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder="Paste full email headers here..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-xs"
          />
        </div>

        <button
          onClick={analyzeHeaders}
          className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Analyze Headers
        </button>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">What to look for:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• SPF (Sender Policy Framework) verification</li>
            <li>• DKIM (DomainKeys Identified Mail) signatures</li>
            <li>• DMARC (Domain-based Message Authentication) status</li>
            <li>• Return-Path and From address consistency</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default EmailHeaderAnalyzer;
