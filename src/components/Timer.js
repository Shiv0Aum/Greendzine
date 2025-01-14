import React, { useEffect, useState } from 'react';

const Timer = ({ resetKey }) => {
    const [timeLeft, setTimeLeft] = useState(30); // Set your timer duration (e.g., 30 seconds)

    useEffect(() => {
        setTimeLeft(30); // Reset timer when resetKey changes
    }, [resetKey]);

    useEffect(() => {
        if (timeLeft === 0) return; // Stop if timer hits 0

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                clearInterval(interval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [timeLeft]);

    return <div>00:{timeLeft}sec</div>;
};

export default Timer;
