import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

const PasswordStrengthAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analyzePassword = (pwd) => {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      noCommon: !['password', '123456', 'qwerty', 'admin', 'letmein'].some(common => 
        pwd.toLowerCase().includes(common)
      ),
    };

    const strength = Object.values(checks).filter(Boolean).length;
    
    let level = 'Very Weak';
    let color = 'bg-red-500';
    let textColor = 'text-red-600 dark:text-red-400';
    
    if (strength >= 6) {
      level = 'Strong';
      color = 'bg-green-500';
      textColor = 'text-green-600 dark:text-green-400';
    } else if (strength >= 4) {
      level = 'Moderate';
      color = 'bg-yellow-500';
      textColor = 'text-yellow-600 dark:text-yellow-400';
    } else if (strength >= 2) {
      level = 'Weak';
      color = 'bg-orange-500';
      textColor = 'text-orange-600 dark:text-orange-400';
    }

    return { checks, strength, level, color, textColor };
  };

  const analysis = password ? analyzePassword(password) : null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-blue-500 dark:text-blue-400" size={32} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Password Strength Analyzer
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter a password to analyze:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Strength Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password Strength:
              </span>
              <span className={`text-sm font-bold ${analysis.textColor}`}>
                {analysis.level}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${analysis.color} transition-all duration-500`}
                style={{ width: `${(analysis.strength / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Security Checks */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Security Requirements:
            </h3>
            
            <CheckItem
              met={analysis.checks.length}
              text="At least 12 characters long"
            />
            <CheckItem
              met={analysis.checks.uppercase}
              text="Contains uppercase letters (A-Z)"
            />
            <CheckItem
              met={analysis.checks.lowercase}
              text="Contains lowercase letters (a-z)"
            />
            <CheckItem
              met={analysis.checks.numbers}
              text="Contains numbers (0-9)"
            />
            <CheckItem
              met={analysis.checks.special}
              text="Contains special characters (!@#$%...)"
            />
            <CheckItem
              met={analysis.checks.noCommon}
              text="Not a commonly used password"
            />
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Password Tips:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Use a unique password for each account</li>
                  <li>• Consider using a passphrase (e.g., "Coffee!Morning@2024Sky")</li>
                  <li>• Avoid personal information like names or birthdays</li>
                  <li>• Use a password manager to generate and store passwords</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!password && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Shield className="mx-auto mb-3 opacity-50" size={48} />
          <p>Start typing to analyze password strength</p>
        </div>
      )}
    </div>
  );
};

const CheckItem = ({ met, text }) => (
  <div className="flex items-center gap-3">
    {met ? (
      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
    ) : (
      <XCircle className="text-red-500 flex-shrink-0" size={20} />
    )}
    <span className={`text-sm ${met ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
      {text}
    </span>
  </div>
);

export default PasswordStrengthAnalyzer;
