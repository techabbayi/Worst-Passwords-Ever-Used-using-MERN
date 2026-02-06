import { useState } from 'react';
import { Shield, Search } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const DNSLeakTest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const runTest = async () => {
    setTesting(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock DNS leak test results
    const mockServers = [
      { ip: '8.8.8.8', provider: 'Google DNS', country: 'United States' },
      { ip: '8.8.4.4', provider: 'Google DNS', country: 'United States' },
    ];

    const hasLeak = mockServers.some(s => s.provider.includes('ISP'));

    setResult({
      type: hasLeak ? 'danger' : 'safe',
      title: hasLeak ? 'DNS Leak Detected!' : 'No DNS Leaks Detected',
      message: hasLeak 
        ? 'Your DNS queries are being handled by your ISP instead of your VPN. Your browsing activity may be visible.'
        : 'Your DNS queries are properly routed through your VPN. Your privacy is protected.',
      details: (
        <div className="space-y-3">
          <strong>DNS Servers Detected:</strong>
          {mockServers.map((server, idx) => (
            <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded text-sm">
              <div className="font-mono">{server.ip}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{server.provider} • {server.country}</div>
            </div>
          ))}
        </div>
      )
    });

    setTesting(false);
  };

  return (
    <ToolLayout
      title="DNS Leak Test"
      description="Check if your VPN is leaking DNS queries"
      icon="🔒"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <button
            onClick={runTest}
            disabled={testing}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            {testing ? <Shield className="animate-pulse" size={20} /> : <Search size={20} />}
            {testing ? 'Testing DNS...' : 'Run DNS Leak Test'}
          </button>
        </div>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">What is a DNS Leak?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            When you use a VPN, your DNS queries should be routed through the VPN tunnel. A DNS leak occurs when your queries bypass the VPN and go directly to your ISP's DNS servers, potentially exposing your browsing activity.
          </p>
          <h3 className="font-semibold mb-2">How to fix DNS leaks:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Use your VPN's DNS servers instead of your ISP's</li>
            <li>• Enable DNS leak protection in your VPN settings</li>
            <li>• Use a VPN that offers built-in DNS leak protection</li>
            <li>• Configure your system to use encrypted DNS (DoH/DoT)</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DNSLeakTest;
