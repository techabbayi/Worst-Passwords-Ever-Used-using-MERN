import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const ToolLayout = ({ title, description, icon, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar />
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link
          to="/security-tools-hub"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Tools Hub</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">{icon}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{description}</p>
        </div>

        {/* Content */}
        {children}

        {/* Privacy Notice */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <span>🔒</span>
            <span><strong>Privacy First:</strong> No data is stored on our servers. All processing happens in your browser or through secure, temporary API calls.</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ToolLayout;
