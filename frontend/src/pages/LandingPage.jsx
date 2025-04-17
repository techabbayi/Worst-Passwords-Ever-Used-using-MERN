import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordOfTheDay from "../components/PasswordOfTheDay";
import lock from '../assets/lock.png';
import Navbar from "../components/Navbar";

function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full bg-gray-800 shadow-md">
        <Navbar/>
      </header>

      {/* Hero Section */}
      <main className="text-center mt-16 mx-10">
        <div className="flex items-center justify-evenly gap-20 flex-col sm:flex-row">
          <div className="w-full sm:w-[60%]">
            <h2 className="text-4xl font-bold text-blue-400">Worst Passwords Ever Used</h2>
            <p className="mt-4 text-gray-300 text-lg">
              Don’t Let Hackers In the Front Door. Each year, millions of accounts get compromised because users rely on weak, predictable passwords like “123456” or “password”. This project is a wake-up call — showcasing the most common and vulnerable passwords ever used.
            </p>
          </div>
          <section>
            <PasswordOfTheDay showForm={false} />
          </section>
        </div>

        {/* About Section */}
        <section className="mt-16 bg-gray-800 p-8">
          <div className="flex items-center flex-col sm:flex-row gap-10 sm:gap-15">
            <div className="w-2/5 p-20">
              <img src={lock} alt="lockimage" className="invert mx-auto" />
            </div>
            <div className="py-5 sm:py-0 w-full sm:w-1/2">
              <h3 className="text-3xl font-bold text-blue-400 mb-4">🔎 About This Project</h3>
              <p className="text-gray-300 text-lg text-left leading-relaxed mb-6">
                Weak passwords are one of the easiest ways for attackers to gain unauthorized access to accounts. Despite constant warnings, many users still rely on incredibly predictable passwords like:
              </p>
              <ul className="list-disc text-left list-inside text-gray-200 text-base mb-6 space-y-1 pl-4">
                <li>123456</li>
                <li>qwerty</li>
                <li>password</li>
                <li>iloveyou</li>
              </ul>
              <p className="text-gray-300 text-lg leading-relaxed">
                This project was created to raise awareness about these common vulnerabilities and to encourage users to adopt strong, unique passwords to protect their online accounts.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="bg-gray-800 flex flex-col sm:flex-row justify-center items-center gap-20 m-auto">
          <div className="rounded-xl p-8">
            <h4 className="text-2xl text-center font-bold text-blue-400 mb-4">🚀 Project Features</h4>
            <ul className="list-none space-y-3 text-left text-gray-200 text-lg list-inside">
              <li>📋 List of commonly used weak passwords</li>
              <li>📝 User submissions for weak passwords</li>
              <li>🔀 Random weak password generator</li>
              <li>🛡️ Cybersecurity awareness through education</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:justify-center gap-6">
            <Link to="/dashboard">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                📤 Submit a Weak Password
              </button>
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              🔑 View Password of the Day
            </button>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-gray-600 p-6 rounded-2xl shadow-lg max-w-xl w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-4xl top-4 right-6 cursor-pointer text-white hover:text-red-500 transition"
            >
              &times;
            </button>
            <h2 className="text-2xl text-blue-400 font-bold mb-4 text-center">🔐 Password of the Day</h2>
            {/* ✅ Pass setShowModal to allow form to close modal */}
            <PasswordOfTheDay showForm={true} setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-sm pb-6">
        🔒 Remember: Strong passwords protect you from cyber threats.
      </footer>
    </div>
  );
}

export default LandingPage;
