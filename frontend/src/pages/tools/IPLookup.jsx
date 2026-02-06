import { useState } from 'react';
import { Globe, Search, Loader } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const IPLookup = () => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const lookupIP = async () => {
    if (!ip) {
      setResult({ type: 'warning', message: 'Please enter an IP address.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Using free IP geolocation API
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.reason || 'Invalid IP address');
      }

      setResult({
        type: 'info',
        title: 'IP Lookup Complete',
        message: `Information for IP: ${ip}`,
        details: (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><strong>Country:</strong> {data.country_name || 'N/A'}</div>
              <div><strong>City:</strong> {data.city || 'N/A'}</div>
              <div><strong>Region:</strong> {data.region || 'N/A'}</div>
              <div><strong>Postal:</strong> {data.postal || 'N/A'}</div>
              <div><strong>ISP:</strong> {data.org || 'N/A'}</div>
              <div><strong>ASN:</strong> {data.asn || 'N/A'}</div>
              <div><strong>Timezone:</strong> {data.timezone || 'N/A'}</div>
              <div><strong>Coordinates:</strong> {data.latitude}, {data.longitude}</div>
            </div>
          </div>
        )
      });
    } catch (error) {
      setResult({
        type: 'danger',
        title: 'Lookup Failed',
        message: error.message || 'Unable to lookup IP address. Please verify the IP and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="IP Address Lookup"
      description="Get geolocation, ISP, and ASN information for any IP address"
      icon="🌍"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">IP Address</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && lookupIP()}
              placeholder="8.8.8.8"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={lookupIP}
              disabled={loading}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
              Lookup
            </button>
          </div>
        </div>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">Use Cases:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Identify the geographical location of an IP</li>
            <li>• Find out which ISP owns an IP address</li>
            <li>• Investigate suspicious connection attempts</li>
            <li>• Verify VPN or proxy server locations</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default IPLookup;
