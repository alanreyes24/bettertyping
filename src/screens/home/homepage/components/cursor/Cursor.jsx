import React, { useEffect, useState } from "react";

function Cursor({ shouldUpdate, currentLetter }) {
    const [currentLetterIndex, setCurrentLetterIndex] = useState(currentLetter);

    const getOffset = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    };

    const updateCursor = () => {
        if (document.getElementsByClassName("letter").length > 0) {
            let currentLetter =
                document.getElementsByClassName("letter")[currentLetterIndex];
            // let nextLetter = document.getElementsByClassName('letter')[1];

            let letterX = getOffset(currentLetter).left;
            let letterY = getOffset(currentLetter).top;

            document.getElementById("cursor").style.position = "absolute";
            document.getElementById("cursor").style.top = letterY + 8 + "px";
            document.getElementById("cursor").style.left = letterX - 8 + "px";
        } else {
            document.getElementById("cursor").style.opacity = 0;
        }
    };

    useEffect(() => {
        setCurrentLetterIndex(currentLetter);
    }, [currentLetter]);

    useEffect(() => {
        if (!shouldUpdate) {
            document.getElementById("cursor").style.opacity = 0;
        } else {
            setTimeout(() => updateCursor());
            document.getElementById("cursor").style.opacity = 1;
        }
    });

    return (
        <div
            id="cursor"
            className="cursor ml-2 bg-primary w-[0.1rem] h-7 transition-all absolute "
        />
    );
}

export default Cursor;
