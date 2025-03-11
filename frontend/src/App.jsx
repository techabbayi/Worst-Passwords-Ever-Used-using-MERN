import React from "react";
import "./App.css";  

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Worst Passwords Ever Used</h1>
        <p className="subheading">
          Be aware of weak passwords. Strengthen your security with strong passwords and avoid the ones listed here!
        </p>
      </header>

      <section className="about">
        <h2>About This Project</h2>
        <p>
          The "Worst Passwords Ever Used" project highlights some of the most common and easily guessable passwords.
          The goal is to raise awareness about weak passwords and encourage users to use stronger passwords to safeguard their accounts.
        </p>
      </section>


      <section className="project-info">
        <h3>Project Features:</h3>
        <ul>
          <li>List of commonly used weak passwords</li>
          <li>User submissions for weak passwords</li>
          <li>Random weak password generator</li>
          <li>Cybersecurity awareness through education</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Remember: Strong passwords protect you from cyber threats.</p>
      </footer>
    </div>
  );
}

export default App;
