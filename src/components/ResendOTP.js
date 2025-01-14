// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ResendOTP = () => {
//   const navigate = useNavigate();

//   const handleResend = () => {
//     alert("New OTP has been sent!");
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Resend OTP</h1>
//       <button onClick={handleResend}>Resend OTP</button>
//     </div>
//   );
// };

// export default ResendOTP;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOtp, saveOtpToJson } from '../utils';
import '../assets/styles/Style.css';

const ResendOTP = () => {
    const navigate = useNavigate();

    const handleResendOtp = async () => {
        const newOtp = generateOtp();
        await saveOtpToJson(newOtp);
        alert(`Your new OTP is: ${newOtp}`);
        navigate('/');
    };

    return (
        <div className="resend-otp-container">
            <div className="resend-box">
                <h2>Resend OTP</h2>
                <button className="resend-otp-btn" onClick={handleResendOtp}>Resend OTP</button>
            </div>
        </div>
    );
};

export default ResendOTP;












