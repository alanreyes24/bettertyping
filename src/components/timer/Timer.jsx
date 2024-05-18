import React, { useEffect, useState } from "react";

function Timer({passTimerInfo, passSetTimerInfo}) {

    console.log(passTimerInfo)
    const [timeLeft, setTimeLeft] = useState(150); // need to make this assignment stuff work
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        passSetTimerInfo({
            timeLeft: timeLeft,
            isActive: isActive,
        });
    }, [timeLeft, isActive]);

    useEffect(() => {

        if (isActive && timeLeft > 0) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 100);
            setTimeout(() => passSetTimerInfo(passSetTimerInfo.timeLeft = timeLeft))
        }

        if (timeLeft == 0) {
            passSetTimerInfo(passSetTimerInfo.isActive = false);
        }
    }, [isActive, timeLeft])

    return <div style={{ fontSize: '3rem', fontWeight: '700', }}>{(timeLeft / 10).toFixed(1)}</div>;


}

export default Timer;