import { useState } from 'react';
import { Wrench, Shield, Key } from 'lucide-react';
import Navbar from '../components/Navbar';
import PasswordStrengthAnalyzer from '../components/PasswordStrengthAnalyzer';
import PasswordGenerator from '../components/PasswordGenerator';

const CyberSecurityTools = () => {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wrench className="text-blue-500 dark:text-blue-400" size={40} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Cybersecurity Tools
            </h1>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Professional tools to help you create and analyze secure passwords
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <TabButton
            active={activeTab === 'analyzer'}
            onClick={() => setActiveTab('analyzer')}
            icon={<Shield size={20} />}
            label="Password Analyzer"
          />
          <TabButton
            active={activeTab === 'generator'}
            onClick={() => setActiveTab('generator')}
            icon={<Key size={20} />}
            label="Password Generator"
          />
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === 'analyzer' && <PasswordStrengthAnalyzer />}
          {activeTab === 'generator' && <PasswordGenerator />}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <InfoBox
            title="🛡️ Why Analyze Your Password?"
            description="Understanding your password's strength helps identify vulnerabilities before hackers do. Our analyzer checks against common attack patterns and security best practices."
          />
          <InfoBox
            title="🔐 Why Generate Strong Passwords?"
            description="Randomly generated passwords are virtually impossible to guess or crack. They provide maximum security for your sensitive accounts and data."
          />
        </div>
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
      active
        ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

const InfoBox = ({ title, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default CyberSecurityTools;
