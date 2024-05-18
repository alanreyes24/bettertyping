import React, { useEffect, useState } from "react";

function Timer({ settings, updateTimerInfo, start }) {

    // console.log(passTimerInfo)
    const [timeLeft, setTimeLeft] = useState(300); // need to make this assignment stuff work
    const [isActive, setIsActive] = useState(false);
    const [timerUp, setTimerUp] = useState(false) //is the timer counting up or down

    useEffect(() => {
        updateTimerInfo({
            timeLeft: timeLeft,
            isActive: isActive,
            timerUp: timerUp,
        });
    }, [timeLeft, isActive, timerUp]);

    useEffect(() => {
        if (start) {
            setIsActive(start)
        }
    }, [start])

    useEffect(() => {
        if (settings.length != undefined)
            setTimeout(() => { setTimeLeft(settings.length) })
    }, [settings.length])

    //if test is a words test
    useEffect(() => {
        if (settings.type == "words")
            setTimeout(() => { setTimerUp(true); setTimeLeft(0) })
    }, [settings.type])

    useEffect(() => {

        if (isActive && timeLeft > 0 && !timerUp) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 100);
            // THIS DOES NOT NEED TO UPDATE TIMER INFO BECAUSE IT ALREADY UPDATES FROM OUR LOCAL STATE CHANGING (THE EARLIER USEEFFECT)
            // doing so causes the timerInfo to be just the time left, and not the object containing both timeleft and isactive
            //setTimeout(() => updateTimerInfo(updateTimerInfo.timeLeft = timeLeft))
        }

        if (isActive && timerUp) {
            setTimeout(() => setTimeLeft(timeLeft + 1), 100);
        }

        if (timeLeft == 0) {
            //SAME HERE as above
            // updateTimerInfo(updateTimerInfo.isActive = false);
            setIsActive(false)
        }
    }, [isActive, timeLeft, timerUp])

    return <div style={{ fontSize: '3rem', fontWeight: '700', }}>{(timeLeft / 10).toFixed(1)}</div>;


}

export default Timer;