import { Shield, Key, Link as LinkIcon, Mail, Network, Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import ToolCard from '../components/tools/ToolCard';

const SecurityToolsHub = () => {
  const toolCategories = [
    {
      title: 'Identity & Account Security',
      icon: '🔐',
      tools: [
        {
          icon: '🔍',
          title: 'Have I Been Pwned',
          description: 'Check if your email or password has been exposed in a data breach',
          link: '/tools/breach-checker',
          color: 'blue'
        },
        {
          icon: '👤',
          title: 'Username Checker',
          description: 'Check username availability across multiple platforms',
          link: '/tools/username-checker',
          color: 'cyan'
        },
        {
          icon: '📧',
          title: 'Disposable Email',
          description: 'Generate temporary email addresses for testing',
          link: '/tools/disposable-email',
          color: 'purple'
        }
      ]
    },
    {
      title: 'Encryption & Data Integrity',
      icon: '🔒',
      tools: [
        {
          icon: '🔐',
          title: 'Text Encryption',
          description: 'Encrypt and decrypt text using AES-256 encryption',
          link: '/tools/text-encryption',
          color: 'green'
        },
        {
          icon: '#️⃣',
          title: 'Hash Generator',
          description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
          link: '/tools/hash-generator',
          color: 'orange'
        },
        {
          icon: '✓',
          title: 'Checksum Validator',
          description: 'Verify file integrity with checksum validation',
          link: '/tools/checksum-validator',
          color: 'blue'
        }
      ]
    },
    {
      title: 'Web & Link Safety',
      icon: '🌐',
      tools: [
        {
          icon: '🔗',
          title: 'URL Safety Checker',
          description: 'Scan URLs for phishing, malware, and suspicious content',
          link: '/tools/url-scanner',
          color: 'red'
        },
        {
          icon: '🔓',
          title: 'Short URL Expander',
          description: 'Reveal the final destination of shortened URLs',
          link: '/tools/url-expander',
          color: 'cyan'
        },
        {
          icon: '🎭',
          title: 'Fake Website Detector',
          description: 'Detect typosquatting and cloned websites',
          link: '/tools/fake-website-detector',
          color: 'purple'
        }
      ]
    },
    {
      title: 'Email Security',
      icon: '✉️',
      tools: [
        {
          icon: '📨',
          title: 'Email Header Analyzer',
          description: 'Analyze email headers to detect spoofing and phishing',
          link: '/tools/email-header-analyzer',
          color: 'orange'
        }
      ]
    },
    {
      title: 'Network & Privacy',
      icon: '🌐',
      tools: [
        {
          icon: '🌍',
          title: 'IP Address Lookup',
          description: 'Get geolocation, ISP, and ASN information for any IP',
          link: '/tools/ip-lookup',
          color: 'green'
        },
        {
          icon: '🔒',
          title: 'DNS Leak Test',
          description: 'Check if your VPN is leaking DNS queries',
          link: '/tools/dns-leak-test',
          color: 'blue'
        }
      ]
    },
    {
      title: 'Media & File Privacy',
      icon: '🖼️',
      tools: [
        {
          icon: '🏷️',
          title: 'Metadata Remover',
          description: 'Strip EXIF data from images and documents',
          link: '/tools/metadata-remover',
          color: 'purple'
        },
        {
          icon: '📱',
          title: 'QR Code Scanner',
          description: 'Decode and scan QR codes for malicious links',
          link: '/tools/qr-scanner',
          color: 'cyan'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="text-blue-500 dark:text-blue-400" size={48} />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Cyber Security Utilities Hub
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your all-in-one toolkit for everyday cybersecurity. Safe, legal, and privacy-first tools for students, professionals, and general users.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
              <span>✓</span> No Data Stored
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
              <span>✓</span> Privacy First
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
              <span>✓</span> 100% Legal
            </div>
          </div>
        </div>

        {/* Tool Categories */}
        {toolCategories.map((category, idx) => (
          <section key={idx} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {category.title}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool, toolIdx) => (
                <ToolCard key={toolIdx} {...tool} />
              ))}
            </div>
          </section>
        ))}

        {/* Security Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-2">
            ⚠️ Security Disclaimer
          </h3>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            These tools are provided for educational and security awareness purposes. Always ensure you have permission to test or scan systems, URLs, or accounts. We do not store any sensitive data, and all processing is done securely with privacy as our top priority.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SecurityToolsHub;
