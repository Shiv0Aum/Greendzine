import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // To send OTP to email
import { generateOtp, saveOtpToJson, getOtpFromJson } from '../utils';
import Timer from './Timer';

const Login = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [resetKey, setResetKey] = useState(0); // Key to reset the Timer
    const [otpExpiry, setOtpExpiry] = useState(false); // Track OTP validity
    const navigate = useNavigate();

    useEffect(() => {
        const storedOtp = getOtpFromJson();
        if (!storedOtp) {
            sendOtp(); // Send OTP when the page loads if no OTP is present
        }

        // Enable "Resend OTP" button 30 seconds after the page loads
        const enableResendTimer = setTimeout(() => {
            setOtpExpiry(true);
        }, 30000);

        // Cleanup timer on component unmount
        return () => clearTimeout(enableResendTimer);
    }, []);

    // Function to send OTP to the email
    const sendOtp = () => {
        const newOtp = generateOtp(); // Generate a new OTP
        saveOtpToJson(newOtp); // Save OTP to the mock database or JSON file

        const templateParams = {
            to_email: 'user@example.com', // Replace with the user's email input
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
                setMessage('OTP has been sent to your email.');
                setMessageType('success');
                setOtpExpiry(false); // Disable "Resend OTP" until it is re-enabled
                setResetKey((prevKey) => prevKey + 1); // Reset the timer when OTP is sent

                // Enable "Resend OTP" after 30 seconds
                setTimeout(() => {
                    setOtpExpiry(true);
                }, 30000);
            })
            .catch((error) => {
                console.error('Failed to send OTP:', error);
                setMessage('Failed to send OTP. Please try again.');
                setMessageType('error');
            });
    };

    // Function to resend the OTP when the user clicks "Resend OTP"
    const handleResendOtp = () => {
        if (!otpExpiry) return; // Prevent resending if OTP is not yet allowed
        sendOtp(); // Resend OTP via email
        setMessage('A new OTP has been sent!');
        setMessageType('success');
    };

    // Handle form submission (OTP validation)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedOtp = await getOtpFromJson();
        if (otp === storedOtp && !otpExpiry) {
            setMessage('OTP Verified Successfully!');
            setMessageType('success');
            setTimeout(() => navigate('/dashboard'), 1000); // Navigate to dashboard after 1 second
        } else if (otpExpiry) {
            setMessage('OTP has expired. Please request a new one.');
            setMessageType('error');
        } else {
            setMessage('Incorrect OTP. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="login-container" style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
            <div className="login-box">
                <div className="otp-section">
                    <h2>Enter OTP sent to your Email</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="otp-holder">
                            <input
                                type="text"
                                className="otp-input"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    padding: '16px',
                                    fontSize: '16px',
                                    border: 'none',
                                    borderRadius: '14px',
                                    marginBottom: '20px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    outline: 'none',
                                    textAlign: 'center',
                                }}
                            />
                            <div className="resend-timer">
                                <span
                                    className={`resend-link ${otpExpiry ? '' : 'disabled'}`}
                                    onClick={handleResendOtp}
                                    style={{
                                        color: otpExpiry ? 'white' : 'grey',
                                        textDecoration: 'none',
                                        cursor: otpExpiry ? 'pointer' : 'not-allowed',
                                    }}
                                >
                                    Resend OTP
                                </span>
                                <Timer resetKey={resetKey} />
                            </div>
                        </div>
                        <button className="validate-btn" type="submit">
                            Validate
                        </button>
                    </form>
                    <p className={`message ${messageType}`}> {message ? message : <>&nbsp;</>} </p>
                </div>
                <div className="info-section">
                    <h3>Web Application with Analytics Dashboard</h3>
                </div>
            </div>
        </div>
    );
};

export default Login;
