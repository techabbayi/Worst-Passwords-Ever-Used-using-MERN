import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/WeakPasswordSubmission';
import LandingPage from './pages/LandingPage';
import PasswordOfTheDay from './components/PasswordOfTheday';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/WeakPasswordSUbmission" element={<UserDashboard />} />
          <Route path='/PasswordOfTheDay' element={<PasswordOfTheDay />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
