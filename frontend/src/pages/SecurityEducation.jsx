import { BookOpen, Shield, AlertCircle, Lightbulb, Lock, Key } from 'lucide-react';
import Navbar from '../components/Navbar';

const SecurityEducation = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-blue-500 dark:text-blue-400" size={40} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Cybersecurity Education
            </h1>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Learn essential cybersecurity practices to protect your digital identity
          </p>
        </div>

        {/* Password Security Basics */}
        <Section
          icon={<Lock size={28} />}
          title="Password Security Basics"
          color="blue"
        >
          <div className="space-y-4">
            <InfoCard
              title="What Makes a Strong Password?"
              items={[
                'At least 12-16 characters in length',
                'Mix of uppercase and lowercase letters',
                'Combination of numbers and special characters',
                'No dictionary words or personal information',
                'Unique for each account'
              ]}
            />
            <InfoCard
              title="Common Password Mistakes to Avoid"
              items={[
                'Using "password" or "123456"',
                'Reusing passwords across multiple accounts',
                'Including your name, birthday, or pet names',
                'Using simple keyboard patterns like "qwerty"',
                'Sharing passwords via email or text'
              ]}
              type="warning"
            />
          </div>
        </Section>

        {/* Best Practices */}
        <Section
          icon={<Shield size={28} />}
          title="Security Best Practices"
          color="green"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <PracticeCard
              icon={<Key size={24} />}
              title="Use a Password Manager"
              description="Password managers securely store and generate strong passwords for all your accounts. This way, you only need to remember one master password."
            />
            <PracticeCard
              icon={<Shield size={24} />}
              title="Enable Two-Factor Authentication (2FA)"
              description="2FA adds an extra layer of security by requiring a second form of verification beyond your password, like a code sent to your phone."
            />
            <PracticeCard
              icon={<AlertCircle size={24} />}
              title="Watch for Phishing Attempts"
              description="Never click suspicious links or provide passwords via email. Always verify the sender and check URLs carefully before entering credentials."
            />
            <PracticeCard
              icon={<Lightbulb size={24} />}
              title="Regular Password Updates"
              description="Change passwords regularly, especially for critical accounts like email and banking. Update immediately if you suspect a breach."
            />
          </div>
        </Section>

        {/* Real-World Examples */}
        <Section
          icon={<AlertCircle size={28} />}
          title="Real-World Data Breaches"
          color="red"
        >
          <div className="space-y-4">
            <BreachExample
              year="2021"
              incident="LinkedIn Data Breach"
              description="700 million user records exposed, including emails and passwords. Many accounts used weak passwords making them easy to crack."
            />
            <BreachExample
              year="2019"
              incident="Collection #1"
              description="773 million unique email addresses and 21 million unique passwords leaked. Many were simple passwords like '123456' and 'password'."
            />
            <BreachExample
              year="2017"
              incident="Equifax Breach"
              description="147 million people affected. Weak passwords and unpatched vulnerabilities allowed hackers to access sensitive financial data."
            />
          </div>
        </Section>

        {/* Quick Tips */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb size={28} />
            Quick Security Tips
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <TipItem text="Use passphrases: 'Coffee!Morning@2024Sky' is stronger than 'C0ff33!'" />
            <TipItem text="Never use the same password for multiple accounts" />
            <TipItem text="Check if your email has been breached at haveibeenpwned.com" />
            <TipItem text="Log out of accounts when using public computers" />
            <TipItem text="Be wary of public Wi-Fi for sensitive transactions" />
            <TipItem text="Keep your devices and software updated" />
          </div>
        </div>
      </main>
    </div>
  );
};

const Section = ({ icon, title, color, children }) => {
  const colorClasses = {
    blue: 'text-blue-500 dark:text-blue-400',
    green: 'text-green-500 dark:text-green-400',
    red: 'text-red-500 dark:text-red-400'
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className={colorClasses[color]}>{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
};

const InfoCard = ({ title, items, type = 'info' }) => {
  const bgColor = type === 'warning' 
    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';

  return (
    <div className={`p-6 rounded-lg border ${bgColor} transition-colors duration-300`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PracticeCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-blue-500 dark:text-blue-400">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const BreachExample = ({ year, incident, description }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500 transition-colors duration-300">
    <div className="flex items-center gap-2 mb-2">
      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded">
        {year}
      </span>
      <h4 className="font-semibold text-gray-900 dark:text-white">{incident}</h4>
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </div>
);

const TipItem = ({ text }) => (
  <div className="flex items-start gap-2">
    <span className="text-yellow-300 mt-1">✓</span>
    <span className="text-white/90">{text}</span>
  </div>
);

export default SecurityEducation;
