import React, { useEffect, useState } from "react";

function Timer({ time, start, stop, onTimerZero, passTimeLeft }) {
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        if (start && timeLeft > 0) {
            setTimeout(() => setTimeLeft(timeLeft - 0.1), 100);
        }
        if (timeLeft === 0) {
            onTimerZero();
        }

        if (!start) {
            console.log('should pass time left here');
            console.log(timeLeft);
            passTimeLeft(timeLeft);
        }
    }, [start, stop, timeLeft]);

    // Display timeLeft as a floating-point number
    return <div>{parseFloat(timeLeft).toFixed(1)}</div>;
}

export default Timer;