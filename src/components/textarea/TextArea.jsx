import React, { Component, createElement, useEffect, useState } from "react";
import Word from "../word/Word";
import Timer from "../timer/Timer";
import Cursor from "../cursor/Cursor";
import "./TextAreaStyles.css";

function TextArea({
    onTextFinished,
    passCorrectLetters,
    passIncorrectLetters,
    passNumCorrectLetters,
    passCorrectWords,
    onTextStarted,
    onFocus,
    onFocusLost,
    settings,
    game
}) {
    const [wordList, setWordList] = useState({});
    const [wordsLoaded, setWordsLoaded] = useState(false);

    const [correctLetters, setCorrectLetters] = useState([]); // going to have to pull size of array from test size option
    const [incorrectLetters, setIncorrectLetters] = useState(() => Array(game.settings.length).fill(null));

    const [totalCorrectLetters, setTotalCorrectLetters] = useState(1);
    const [totalCorrectWords, setTotalCorrectWords] = useState(1);
    const [deleteLines, setDeleteLines] = useState(0)

    useEffect(() => {
        passCorrectLetters(correctLetters)
    },[correctLetters, passCorrectLetters])

    useEffect(() => {
        passIncorrectLetters(incorrectLetters) // i don't know if i can condense these into one useEffect
    },[incorrectLetters, passIncorrectLetters])
    
    const focusInput = () => {
        document.getElementById("input").focus();
        onFocus();
    };

    //async function to get wordMap because it takes a second
    const wordMap = (amount) => {
        return new Promise((resolve) => {
            resolve(
                Array(amount)
                    .fill(false)
                    .map((_, i) => (
                        <div key={i} className="word">
                            <Word key={i} />{" "}
                        </div>
                    ))
            );
        });
    };

    async function populateWordList(amount) {
        const result = await wordMap(amount);
        setWordsLoaded(true);
        setWordList(result);
    }


    const getOffset = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    };

    useEffect(() => {
        populateWordList(settings.count);
    }, [settings.type, settings.count]);


    const handleUserInput = (event) => {
        //if user inputs anything start the timer
        onTextStarted();

        let input = event.target.value;

        let currentLetter = document.getElementsByClassName("letter")[0];
        let nextLetter = document.getElementsByClassName("letter")[1];

        if (getOffset(nextLetter).top != getOffset(currentLetter).top) {
            setDeleteLines(deleteLines + 1)
        }

        if (input == currentLetter.textContent) {
            if (currentLetter.textContent != " ") {
                setTotalCorrectLetters(totalCorrectLetters + 1);  // HERE
                setCorrectLetters(prevLetters => [...prevLetters, input]);

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
            setIncorrectLetters(prevLetters => [...prevLetters, input]);
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
                onBlur={() => {
                    onFocusLost();
                }}
                id="input"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                type="text"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                list="autocompleteOff"
                onChange={(event) => {
                    //stops error when no letters left
                    if (document.getElementsByClassName("letter").length > 1 && !game.isFinished) {
                        handleUserInput(event);
                        event.target.value = "";
                    }
                }}
                style={{ opacity: 0, height: 0, width: 0 }}
            ></input>
            <div style={{}} className="type__container">
                <div
                    onClick={() => {
                        // focus input & adds next class to first letter
                        focusInput();

                        document.getElementsByClassName("letter")[0].classList.add("next"); // do we need this?
                    }}
                    className="type__box"
                    style={{ marginTop: deleteLines > 1 ? (deleteLines - 1) * -2 + 'rem' : 0 }}
                >
                    {wordsLoaded == true ? <> {wordList} </> : <></>}
                </div>
            </div>
        </>
    );
}

export default TextArea;
