import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordOfTheDay from "../components/PasswordOfTheday";
import lock from '../assets/lock.png';
import Navbar from "../components/Navbar";

function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center transition-colors duration-300">
      {/* Navbar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <Navbar/>
      </header>

      {/* Hero Section */}
      <main className="text-center mt-8 sm:mt-16 mx-4 sm:mx-10 w-full max-w-7xl">
        <div className="flex items-center justify-center sm:justify-evenly gap-10 sm:gap-20 flex-col sm:flex-row">
          <div className="w-full sm:w-[60%]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 dark:text-blue-400 mb-4">
              Worst Passwords Ever Used
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Don't Let Hackers In the Front Door. Each year, millions of accounts get compromised because users rely on weak, predictable passwords like "123456" or "password". This project is a wake-up call — showcasing the most common and vulnerable passwords ever used.
            </p>
          </div>
          <section className="w-full sm:w-auto">
            <PasswordOfTheDay showForm={false} />
          </section>
        </div>

        {/* About Section */}
        <section className="mt-12 sm:mt-16 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg transition-colors duration-300">
          <div className="flex items-center flex-col sm:flex-row gap-8 sm:gap-15">
            <div className="w-full sm:w-2/5 p-8 sm:p-20">
              <img src={lock} alt="lockimage" className="invert dark:invert-0 mx-auto max-w-[200px] sm:max-w-full" />
            </div>
            <div className="py-5 sm:py-0 w-full sm:w-1/2">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 dark:text-blue-400 mb-4">
                🔎 About This Project
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg text-left leading-relaxed mb-6">
                Weak passwords are one of the easiest ways for attackers to gain unauthorized access to accounts. Despite constant warnings, many users still rely on incredibly predictable passwords like:
              </p>
              <ul className="list-disc text-left list-inside text-gray-800 dark:text-gray-200 text-sm sm:text-base mb-6 space-y-1 pl-4">
                <li>123456</li>
                <li>qwerty</li>
                <li>password</li>
                <li>iloveyou</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                This project was created to raise awareness about these common vulnerabilities and to encourage users to adopt strong, unique passwords to protect their online accounts.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20 m-auto mt-8 sm:mt-12 p-6 sm:p-8 transition-colors duration-300">
          <div className="rounded-xl">
            <h4 className="text-xl sm:text-2xl text-center font-bold text-blue-500 dark:text-blue-400 mb-4">
              🚀 Project Features
            </h4>
            <ul className="list-none space-y-3 text-left text-gray-800 dark:text-gray-200 text-base sm:text-lg list-inside">
              <li>📋 List of commonly used weak passwords</li>
              <li>📝 User submissions for weak passwords</li>
              <li>🔀 Random weak password generator</li>
              <li>🛡️ Cybersecurity awareness through education</li>
              <li>🎨 Modern UI with light & dark themes</li>
              <li>📱 Fully responsive mobile & desktop design</li>
              <li>🔐 Password strength analyzer</li>
              <li>🛠️ Professional security tools</li>
              <li>🔒 All-in-One Cyber Security Utilities Hub</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link to="/security-tools-hub" className="w-full">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                🛡️ Security Hub
              </button>
            </Link>
            <Link to="/security-tools" className="w-full">
              <button className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                🛠️ Security Tools
              </button>
            </Link>
            <Link to="/security-education" className="w-full">
              <button className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                📚 Learn Security
              </button>
            </Link>
            <Link to="/dashboard" className="w-full">
              <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                📤 Submit Password
              </button>
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              🔑 Password of Day
            </button>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg max-w-xl w-full relative animate-fade-in-up transition-colors duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-3xl sm:text-4xl top-4 right-6 cursor-pointer text-gray-700 dark:text-white hover:text-red-500 transition"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl text-blue-500 dark:text-blue-400 font-bold mb-4 text-center">
              🔐 Password of the Day
            </h2>
            {/* ✅ Pass setShowModal to allow form to close modal */}
            <PasswordOfTheDay showForm={true} setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 text-center text-gray-600 dark:text-gray-400 text-sm pb-6 px-4">
        🔒 Remember: Strong passwords protect you from cyber threats.
      </footer>
    </div>
  );
}

export default LandingPage;
