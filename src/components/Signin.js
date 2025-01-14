import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import { generateOtp, saveOtpToJson } from '../utils'; // Assuming utility functions are implemented
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import signin from "../assets/styles/signin.css";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [otpSent, setOtpSent] = useState(false); // Tracks if OTP has been sent
    const navigate = useNavigate(); // Initialize navigate hook

    const sendOtpToEmail = () => {
        if (!email || !email.includes('@')) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            return;
        }

        const newOtp = generateOtp(); // Generate a new OTP
        saveOtpToJson(newOtp); // Save OTP to a mock database or JSON file

        // Store the email in local storage for use in Login.js
        localStorage.setItem('userEmail', email);

        // Sending email using EmailJS
        const templateParams = {
            to_email: email,
            otp: newOtp,
        };

        emailjs
            .send(
                'service_z68t9pj', // Replace with your EmailJS Service ID
                'template_gaw59h2', // Replace with your EmailJS Template ID
                templateParams,
                'PKRjBTWhK3ZyPD0Qv' // Replace with your EmailJS Public Key
            )
            .then(() => {
                setMessage('OTP has been sent to your email!');
                setMessageType('success');
                setOtpSent(true); // Mark OTP as sent
                setTimeout(() => {
                    navigate('/login'); // Navigate to login page after OTP is sent
                }, 1000); // Delay the navigation for 1 second to let the user see the success message
            })
            .catch(() => {
                setMessage('Failed to send OTP. Please try again.');
                setMessageType('error');
            });
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="form-section">
                    <h2>Sign In</h2>
                    <input
                        type="email"
                        className="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <br/>
                    <button
                        className="send-otp-btn"
                        onClick={sendOtpToEmail}
                    >
                        Send OTP
                    </button>
                    {message && <p className={`message ${messageType}`}>{message}</p>}
                </div>
                <div className="info-section">
                    <h3>Web Application with Analytics Dashboard</h3>
                </div>
            </div>
        </div>
    );
};

export default Signin;
