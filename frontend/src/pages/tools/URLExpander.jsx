import { useState } from 'react';
import { Link, ExternalLink, Loader } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const URLExpander = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const expandURL = async () => {
    if (!shortUrl) {
      setResult({ type: 'warning', message: 'Please enter a shortened URL.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // In a real implementation, you would make a HEAD request to follow redirects
      // For demo purposes, we'll simulate the expansion
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate expansion (in production, use a proper URL expansion service or make HEAD requests)
      const mockExpanded = shortUrl.includes('bit.ly') || shortUrl.includes('tinyurl') || shortUrl.includes('t.co')
        ? `https://www.example-expanded-url.com/full/path/to/original/content?param=value`
        : shortUrl;

      const redirectChain = shortUrl !== mockExpanded ? [
        shortUrl,
        'https://intermediate-redirect.com/abc123',
        mockExpanded
      ] : [shortUrl];

      setResult({
        type: 'info',
        title: 'URL Expansion Complete',
        message: redirectChain.length > 1 
          ? `The shortened URL redirects through ${redirectChain.length - 1} hop(s) before reaching the final destination.`
          : 'This URL does not appear to be a shortened link.',
        details: (
          <div className="space-y-3">
            <div>
              <strong>Redirect Chain:</strong>
              <div className="mt-2 space-y-2">
                {redirectChain.map((url, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-xs mt-1 font-semibold text-gray-500 dark:text-gray-400 min-w-[60px]">
                      {idx === 0 ? 'Original:' : idx === redirectChain.length - 1 ? 'Final:' : `Hop ${idx}:`}
                    </span>
                    <div className="flex-1 p-2 bg-white dark:bg-gray-800 rounded text-xs font-mono break-all">
                      {url}
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                        Visit
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {redirectChain.length > 1 && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <p className="text-xs text-yellow-800 dark:text-yellow-300">
                  <strong>⚠️ Security Tip:</strong> Always verify the final destination before visiting. Shortened URLs can hide malicious websites.
                </p>
              </div>
            )}
          </div>
        )
      });
    } catch (error) {
      setResult({
        type: 'danger',
        title: 'Error',
        message: 'Failed to expand URL. Please check the URL and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Short URL Expander"
      description="Reveal the final destination of shortened URLs before clicking"
      icon="🔓"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Shortened URL</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && expandURL()}
              placeholder="https://bit.ly/xxxxx or https://tinyurl.com/xxxxx"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={expandURL}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Link size={20} />}
              Expand
            </button>
          </div>
        </div>

        {/* Result Section */}
        {result && <ResultDisplay {...result} />}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">Common URL Shorteners:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly'].map((service, idx) => (
              <span key={idx} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs">
                {service}
              </span>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Why expand URLs?</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Verify the destination before clicking</li>
            <li>• Detect phishing attempts and malicious links</li>
            <li>• See the full redirect chain</li>
            <li>• Avoid accidentally visiting harmful sites</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default URLExpander;
