import React, { useEffect, useState } from "react";

function Timer({ isActive, time, onTimerZero, passTimeLeft }) {

    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        setTimeLeft(time)
    }, [setTimeLeft, time])

    useEffect(() => {

        passTimeLeft(timeLeft)

        if (!isActive) {

            passTimeLeft(timeLeft);
        }

        if (isActive && timeLeft > 0) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 100);
        }


    }, [isActive, timeLeft]);



    // Display timeLeft as a floating-point number
    return <div style={{ fontSize: '3rem', fontWeight: '700', }}>{(timeLeft / 10).toFixed(1)}</div>;
}

export default Timer;