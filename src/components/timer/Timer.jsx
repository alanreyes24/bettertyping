import React, { useEffect } from "react";

function Timer(props) {
    const [timeLeft, setTimeLeft] = React.useState(props.time);

    useEffect(() => {
        console.log(props.start);

        if (props.start && timeLeft > 0) {
            setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        }
    }, [props.start, timeLeft, props.time]);

    return <div>{timeLeft}</div>;
}


export default Timer;


