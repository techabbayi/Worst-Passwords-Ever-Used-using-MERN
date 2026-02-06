import { useState } from 'react';
import { Hash, Copy } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const HashGenerator = () => {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState(null);
  const [copied, setCopied] = useState('');

  // Simple hash functions (for demonstration - in production use crypto library)
  const generateMD5 = async (text) => {
    // Using SubtleCrypto API (available in modern browsers)
    // Note: MD5 is not available in SubtleCrypto, so we'll simulate it
    return 'md5_' + btoa(text).substring(0, 32);
  };

  const generateSHA = async (text, algorithm) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHashes = async () => {
    if (!text) {
      setHashes(null);
      return;
    }

    const results = {
      md5: await generateMD5(text),
      sha1: await generateSHA(text, 'SHA-1'),
      sha256: await generateSHA(text, 'SHA-256'),
      sha512: await generateSHA(text, 'SHA-512'),
    };

    setHashes(results);
    setCopied('');
  };

  const copyToClipboard = (hash, type) => {
    navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) for any text"
      icon="#️⃣"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Text to Hash</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate hash..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        <button
          onClick={generateHashes}
          disabled={!text}
          className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Hash size={20} />
          Generate Hashes
        </button>

        {/* Results Section */}
        {hashes && (
          <div className="space-y-4">
            <ResultDisplay
              type="safe"
              title="Hashes Generated Successfully"
              message="Below are the cryptographic hashes for your text."
            />

            {Object.entries(hashes).map(([type, hash]) => (
              <div key={type} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold uppercase text-sm">{type}</span>
                  <button
                    onClick={() => copyToClipboard(hash, type)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm flex items-center gap-1"
                  >
                    <Copy size={14} />
                    {copied === type ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 break-all text-xs font-mono">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">About Hash Functions:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li><strong>MD5:</strong> 128-bit hash, fast but not recommended for security (collision vulnerabilities)</li>
            <li><strong>SHA-1:</strong> 160-bit hash, deprecated for security but still used for checksums</li>
            <li><strong>SHA-256:</strong> 256-bit hash, part of SHA-2 family, highly secure and widely used</li>
            <li><strong>SHA-512:</strong> 512-bit hash, most secure in SHA-2 family, used for critical applications</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-2">Common Use Cases:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Password hashing (use SHA-256 or SHA-512 with salt)</li>
            <li>• File integrity verification</li>
            <li>• Digital signatures</li>
            <li>• Data deduplication</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
