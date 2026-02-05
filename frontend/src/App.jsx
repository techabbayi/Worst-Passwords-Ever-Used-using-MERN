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