import { useState } from 'react';
import { Mail, Copy, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const DisposableEmail = () => {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const domains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com', '10minutemail.com'];

  const generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 12);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${randomString}@${randomDomain}`;
    setGeneratedEmail(email);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Disposable Email Generator"
      description="Generate temporary email addresses for testing and privacy"
      icon="📧"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={generateEmail}
            className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            Generate Temporary Email
          </button>
        </div>

        {/* Generated Email Display */}
        {generatedEmail && (
          <div className="space-y-4">
            <ResultDisplay
              type="safe"
              title="Temporary Email Generated!"
              message="Use this email for testing, signups, or when you want to protect your privacy."
            />

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail className="text-purple-500" size={24} />
              <div className="flex-1 font-mono text-lg break-all">{generatedEmail}</div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Copy size={18} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Important:</strong> This is a simulated email address. To actually receive emails, visit the temporary email service website directly (e.g., {generatedEmail.split('@')[1]}).
              </p>
            </div>
          </div>
        )}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">Use Cases:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Sign up for services without exposing your real email</li>
            <li>• Test email functionality in applications</li>
            <li>• Avoid spam and unwanted marketing emails</li>
            <li>• Protect your privacy when required to provide an email</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-2">Popular Services:</h3>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain, idx) => (
              <a
                key={idx}
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                {domain}
              </a>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DisposableEmail;
