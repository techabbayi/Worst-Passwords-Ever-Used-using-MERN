import { useState } from 'react';
import { Lock, Unlock, Copy } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const TextEncryption = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);

  // Simple XOR encryption for demonstration (In production, use crypto library)
  const xorEncrypt = (text, key) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Base64 encode
  };

  const xorDecrypt = (encrypted, key) => {
    try {
      const decoded = atob(encrypted); // Base64 decode
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch {
      return null;
    }
  };

  const handleProcess = () => {
    if (!text || !password) {
      setResult('');
      return;
    }

    if (mode === 'encrypt') {
      const encrypted = xorEncrypt(text, password);
      setResult(encrypted);
    } else {
      const decrypted = xorDecrypt(text, password);
      if (decrypted === null) {
        setResult('Error: Invalid encrypted text or wrong password');
      } else {
        setResult(decrypted);
      }
    }
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Text Encryption Tool"
      description="Encrypt and decrypt text using password-based encryption"
      icon="🔐"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setMode('encrypt')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              mode === 'encrypt'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Lock size={20} />
            Encrypt
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              mode === 'decrypt'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Unlock size={20} />
            Decrypt
          </button>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === 'encrypt' ? 'Text to Encrypt' : 'Encrypted Text'}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter your text here...' : 'Paste encrypted text here...'}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter encryption password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use a strong password. You'll need this to decrypt the text later.
            </p>
          </div>

          <button
            onClick={handleProcess}
            className={`w-full px-6 py-3 ${
              mode === 'encrypt' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold rounded-lg transition-colors`}
          >
            {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="space-y-3">
            <ResultDisplay
              type="safe"
              title={mode === 'encrypt' ? 'Text Encrypted Successfully' : 'Text Decrypted Successfully'}
              message={mode === 'encrypt' 
                ? 'Your text has been encrypted. Save this encrypted text and your password safely.' 
                : 'Your text has been decrypted successfully.'}
            />

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{mode === 'encrypt' ? 'Encrypted Text:' : 'Decrypted Text:'}</span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm flex items-center gap-1"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 break-all text-sm font-mono">
                {result}
              </div>
            </div>
          </div>
        )}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">⚠️ Important Notes:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• This is a demonstration tool using basic encryption</li>
            <li>• For sensitive data, use professional encryption tools</li>
            <li>• Keep your password safe - lost passwords cannot be recovered</li>
            <li>• Your data is processed locally and never sent to any server</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextEncryption;
