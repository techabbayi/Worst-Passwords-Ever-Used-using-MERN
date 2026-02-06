import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import UserDashboard from './pages/WeakPasswordSubmission';
import Leaderboard from './components/Leaderboard';
import HomePage from './pages/LandingPage';
import UserEntityFilter from './components/UserEntityFilter.jsx';
import SecurityEducation from './pages/SecurityEducation';
import CyberSecurityTools from './pages/CyberSecurityTools';
import SecurityToolsHub from './pages/SecurityToolsHub';

// Tool pages
import BreachChecker from './pages/tools/BreachChecker';
import UsernameChecker from './pages/tools/UsernameChecker';
import DisposableEmail from './pages/tools/DisposableEmail';
import TextEncryption from './pages/tools/TextEncryption';
import HashGenerator from './pages/tools/HashGenerator';
import ChecksumValidator from './pages/tools/ChecksumValidator';
import URLScanner from './pages/tools/URLScanner';
import URLExpander from './pages/tools/URLExpander';
import FakeWebsiteDetector from './pages/tools/FakeWebsiteDetector';
import EmailHeaderAnalyzer from './pages/tools/EmailHeaderAnalyzer';
import IPLookup from './pages/tools/IPLookup';
import DNSLeakTest from './pages/tools/DNSLeakTest';
import MetadataRemover from './pages/tools/MetadataRemover';
import QRScanner from './pages/tools/QRScanner';


// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/security-education" element={<SecurityEducation />} />
            <Route path="/security-tools" element={<CyberSecurityTools />} />
            <Route path="/security-tools-hub" element={<SecurityToolsHub />} />
            
            {/* Tool Routes - Module 1: Identity & Account Security */}
            <Route path="/tools/breach-checker" element={<BreachChecker />} />
            <Route path="/tools/username-checker" element={<UsernameChecker />} />
            <Route path="/tools/disposable-email" element={<DisposableEmail />} />
            
            {/* Tool Routes - Module 2: Encryption & Data Integrity */}
            <Route path="/tools/text-encryption" element={<TextEncryption />} />
            <Route path="/tools/hash-generator" element={<HashGenerator />} />
            <Route path="/tools/checksum-validator" element={<ChecksumValidator />} />
            
            {/* Tool Routes - Module 3: Web & Link Safety */}
            <Route path="/tools/url-scanner" element={<URLScanner />} />
            <Route path="/tools/url-expander" element={<URLExpander />} />
            <Route path="/tools/fake-website-detector" element={<FakeWebsiteDetector />} />
            
            {/* Tool Routes - Module 4: Email Security */}
            <Route path="/tools/email-header-analyzer" element={<EmailHeaderAnalyzer />} />
            
            {/* Tool Routes - Module 5: Network & Privacy */}
            <Route path="/tools/ip-lookup" element={<IPLookup />} />
            <Route path="/tools/dns-leak-test" element={<DNSLeakTest />} />
            
            {/* Tool Routes - Module 6: Media & File Privacy */}
            <Route path="/tools/metadata-remover" element={<MetadataRemover />} />
            <Route path="/tools/qr-scanner" element={<QRScanner />} />
            
            <Route
              path="/dashboard"
              element={<UserDashboard />}
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/sqltest" element={<UserEntityFilter/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;