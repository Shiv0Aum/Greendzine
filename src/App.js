import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ResendOTP from "./components/ResendOTP";
import './App.css';
// import './assets/styles/Style.css';

const Header = () => (
  <header className="app-header">
    <div className="logo">Analytics Dashboard</div>
  </header>
);

const Footer = () => (
  <footer className="app-footer">
    © 2025, Greendzine Technologies Pvt. Ltd. All Rights Reserved.
  </footer>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <Header />

        {/* Main Application Routes */}
        <main className="app-content">
          <Routes>
            {/* Sign Page */}
            <Route path="/" element={<Signin />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard Page */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Resend OTP Page */}
            <Route path="/resend-otp" element={<ResendOTP />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
