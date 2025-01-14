let otpData = { otp: "" };

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOtpToJson(otp) {
    otpData.otp = otp;
}

export function getOtpFromJson() {
    return otpData.otp;
}




// let otpData = {};

// export function generateOtp() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export function saveOtpToJson(email, otp) {
//     otpData[email] = otp; // Store OTP per email
// }

// export function getOtpFromJson(email) {
//     return otpData[email] || null; // Retrieve OTP for specific email
// }

