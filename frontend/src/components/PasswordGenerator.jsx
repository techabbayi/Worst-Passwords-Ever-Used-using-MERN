import { useState } from 'react';
import { Key, Copy, RefreshCw, Check, Settings } from 'lucide-react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = () => {
    setError('');
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setError('Please select at least one character type!');
      return;
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }

    setGeneratedPassword(password);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Key className="text-blue-500 dark:text-blue-400" size={32} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Secure Password Generator
          </h2>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Settings className="text-gray-700 dark:text-gray-300" size={20} />
        </button>
      </div>

      {/* Generated Password Display */}
      {generatedPassword && (
        <div className="mb-6 animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your secure password:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={20} />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={20} />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg animate-fade-in">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4 animate-fade-in transition-colors">
          {/* Length Slider */}
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Password Length:</span>
              <span className="text-blue-500 dark:text-blue-400 font-bold">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <CheckboxOption
              checked={includeUppercase}
              onChange={setIncludeUppercase}
              label="Uppercase Letters (A-Z)"
            />
            <CheckboxOption
              checked={includeLowercase}
              onChange={setIncludeLowercase}
              label="Lowercase Letters (a-z)"
            />
            <CheckboxOption
              checked={includeNumbers}
              onChange={setIncludeNumbers}
              label="Numbers (0-9)"
            />
            <CheckboxOption
              checked={includeSpecial}
              onChange={setIncludeSpecial}
              label="Special Characters (!@#$%...)"
            />
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <RefreshCw size={20} />
        Generate Secure Password
      </button>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 transition-colors">
        <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
          🔒 Why Use Strong Passwords?
        </h4>
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
          <li>• Protects against brute-force attacks</li>
          <li>• Prevents unauthorized access to your accounts</li>
          <li>• Cryptographically generated for maximum randomness</li>
          <li>• Never reuse passwords across different services</li>
        </ul>
      </div>
    </div>
  );
};

const CheckboxOption = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
    />
    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
      {label}
    </span>
  </label>
);

export default PasswordGenerator;
