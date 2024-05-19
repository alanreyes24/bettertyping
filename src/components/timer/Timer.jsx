import React, { useEffect, useState } from "react";

function Timer({ settings, updateTimerInfo, start, game }) {

    // console.log(passTimerInfo)
    const [timeLeft, setTimeLeft] = useState(300); // need to make this assignment stuff work
    const [isActive, setIsActive] = useState(false);
    const [timerGoesUp, setTimerGoesUp] = useState(false) //is the timer counting up or down

    useEffect(() => {
        updateTimerInfo({
            timeLeft: game.isRunning ? timeLeft : settings.length,
            isActive: isActive,
            timerGoesUp: timerGoesUp,
        });
    }, [updateTimerInfo, timeLeft, isActive, timerGoesUp, settings, game.isRunning]);

    useEffect(() => {
        if (game.isRunning && !settings.visible) {
            setIsActive(start)
        }
        // if (start && settings.visible) {
        //     setIsActive(false)
        //     setTimeLeft(settings.length)
        //     updateTimerInfo({
        //         timeLeft: timeLeft,
        //         isActive: isActive,
        //         timerGoesUp: timerGoesUp
        //     });
        // }
    }, [start, settings])



    //update the local timer state from the sent timer state (do after sent to game so we dont have game behind local state)
    useEffect(() => {
        setTimeLeft(game.timer.timeLeft)
    }, [game.timer])

    //COMMENT AS A TEST (PROB NEED THIS)
    // useEffect(() => {
    //     if (settings.length != undefined)
    //         setTimeLeft(settings.length)
    // }, [settings.length])

    //if test type is a words test
    useEffect(() => {
        if (settings.type == "words")
            setTimeout(() => { setTimerGoesUp(true); setTimeLeft(0) })
    }, [settings.type])

    useEffect(() => {

        if (game.isRunning && timeLeft > 0 && !timerGoesUp) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 100);


            // THIS DOES NOT NEED TO UPDATE TIMER INFO BECAUSE IT ALREADY UPDATES FROM OUR LOCAL STATE CHANGING (THE EARLIER USEEFFECT)
            // doing so causes the timerInfo to be just the time left, and not the object containing both timeleft and isactive
            //setTimeout(() => updateTimerInfo(updateTimerInfo.timeLeft = timeLeft))
        }

        if (game.isRunning && timerGoesUp) {
            setTimeout(() => setTimeLeft(timeLeft + 1), 100);
        }

        if (timeLeft == 0) {
            //SAME HERE as above
            // updateTimerInfo(updateTimerInfo.isActive = false);
            setIsActive(false)
        }
    }, [isActive, timeLeft, timerGoesUp, game.isRunning])

    return <div style={{ fontSize: '3rem', fontWeight: '700', }}>{timeLeft != undefined ? (timeLeft / 10).toFixed(1) : 30.0}</div>;


}

export default Timer;