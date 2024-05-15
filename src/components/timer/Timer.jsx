import React, { useEffect, useState } from "react";

function Timer({ time, start, stop, onTimerZero, passTimeLeft }) {
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        // console.log(start);

        if (start && timeLeft > 0) {

            setTimeout(() => setTimeLeft(timeLeft - 1), 100);
        }
        if (timeLeft == 0) {
            onTimerZero()
            // console.log(onTimerZero)
        }

        if (!start) {
            console.log('should pass time left here')
            console.log(timeLeft)
            passTimeLeft(timeLeft)
        }



    }, [start, stop, timeLeft,]);



    //MAKE THIS HAVE DECIMAL instead of "300" ie 30.0
    return <div>{timeLeft}</div>;
}


export default Timer;


