import React, { Component, createElement, useEffect, useState } from "react";
import Word from "../word/Word";
import Cursor from "../cursor/Cursor";
import './TextAreaStyles.css'

function TextArea({ onTextFinished, passCorrectLetters, passCorrectWords, onTextStarted }) {

    const focusInput = () => {
        document.getElementById("input").focus();
    };

    useEffect(() => {
        focusInput();
    });

    const [totalCorrectLetters, setTotalCorrectLetters] = useState(1);
    const [totalCorrectWords, setTotalCorrectWords] = useState(1);

    const handleUserInput = (event) => {

        //if user inputs anything start the timer
        onTextStarted()

        let input = event.target.value;
        console.log(input);

        let currentLetter = document.getElementsByClassName("letter")[0];
        let nextLetter = document.getElementsByClassName("letter")[1];

        if (input == currentLetter.textContent) {
            if (currentLetter.textContent != " ") {
                setTotalCorrectLetters(totalCorrectLetters + 1);
                //passes correct letters callback with data

                passCorrectLetters(totalCorrectLetters);
            } else if (currentLetter.textContent == " ") {

                setTotalCorrectWords(totalCorrectWords + 1);
                //passes correct words callback with data
                passCorrectWords(totalCorrectWords);
            }

            currentLetter.classList.remove("incorrect");
            currentLetter.classList.remove("next");
            currentLetter.classList.remove("letter");
            nextLetter.classList.add("next");
            currentLetter.classList.add("correct");
        } else {
            currentLetter.classList.add("incorrect");
        }

        // check to see if on the last space (know when to end the test)
        if (document.getElementsByClassName("letter").length == 1) {
            // give credit for last word since we're skipping the space at the end
            let currentLetter = document.getElementsByClassName("letter")[0];
            currentLetter.classList.remove("next");
            currentLetter.classList.remove("letter");


            setTotalCorrectWords(totalCorrectWords + 1);
            passCorrectWords(totalCorrectWords);
            //passes the prop onTextFinished which is a callback function to an App state
            onTextFinished();
        }
    };

    return (
        <>
            <input
                id="input"
                onChange={(event) => {
                    //stops error when no letters left
                    if (document.getElementsByClassName("letter").length > 1) {
                        handleUserInput(event);
                        event.target.value = "";
                    }
                }}
                style={{ opacity: 0, height: 0, width: 0 }}
            ></input>

            <div
                onClick={() => {
                    // focus input & adds next class to first letter
                    focusInput();

                    document.getElementsByClassName("letter")[0].classList.add("next"); // do we need this?
                }}
                className="type-box"
                style={{
                }}
            >
                {Array(30)
                    .fill(false)
                    .map((_, i) => (
                        <div key={i} className="word">
                            <Word key={i} /> </div>
                    ))}
            </div>
        </>
    );
}

export default TextArea;