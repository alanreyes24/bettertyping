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
    game,

}) {
    const [wordList, setWordList] = useState({});
    const [wordsLoaded, setWordsLoaded] = useState(false);

// for some reason gets defined as NaN before defined as timerLength / 100 so I set the default as 1 and that seems to work
let timerLength = game.settings?.length? Math.floor(game.settings.length / 10) : 1; 

const [correctLetters, setCorrectLetters] = useState(
    Object.fromEntries(
        Array(timerLength).fill().map((_, index) => [index.toString(), null])
    )
);

    const [incorrectLetters, setIncorrectLetters] = useState(
        Object.fromEntries(
          Array(timerLength).fill().map((_, index) => [index.toString(), null])
        )
    );

    const [currentLetterObjectPropertyValue, setCurrentLetterObjectPropertyValue] = useState(0);

    const [totalCorrectLetters, setTotalCorrectLetters] = useState(1);
    const [totalCorrectWords, setTotalCorrectWords] = useState(1);
    const [deleteLines, setDeleteLines] = useState(0)


    useEffect(() => {
        
        const timerId = setInterval(() => {
            setCurrentLetterObjectPropertyValue(prevValue => prevValue + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);


    useEffect(() => {
        passCorrectLetters(correctLetters)
    }, [correctLetters, passCorrectLetters])

    useEffect(() => {
        passIncorrectLetters(incorrectLetters)
    }, [incorrectLetters, passIncorrectLetters])


    const focusInput = () => {
        document.getElementById("input").focus();
        onFocus();
        setWordsLoaded(true);
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
        // Existing logic...
        onTextStarted();
    
        let input = event.target.value;
    
        let currentLetter = document.getElementsByClassName("letter")[0];
        let nextLetter = document.getElementsByClassName("letter")[1];
    
        if (getOffset(nextLetter).top!= getOffset(currentLetter).top) {
            setDeleteLines(deleteLines + 1)
        }
    
        if (input == currentLetter.textContent) {
            if (currentLetter.textContent!= " ") {
                setTotalCorrectLetters(totalCorrectLetters + 1);
    
    
                setCorrectLetters(prevLetters => ({
                    ...prevLetters,
                     [currentLetterObjectPropertyValue]: [...(prevLetters[currentLetterObjectPropertyValue] || []), input]
                   }));
                   
                passCorrectLetters(totalCorrectLetters);
            } else if (currentLetter.textContent == " ") {
                setTotalCorrectWords(totalCorrectWords + 1);
                passCorrectWords(totalCorrectWords);

                setCorrectLetters(prevLetters => ({
                    ...prevLetters,
                     [currentLetterObjectPropertyValue]: [...(prevLetters[currentLetterObjectPropertyValue] || []), input]
                   }));

            }
        
            currentLetter.classList.remove("incorrect");
            currentLetter.classList.remove("next");
            currentLetter.classList.remove("letter");
            nextLetter.classList.add("next");
            currentLetter.classList.add("correct");
        } else {

            setIncorrectLetters(prevLetters => ({
                ...prevLetters,
                 [currentLetterObjectPropertyValue]: [...(prevLetters[currentLetterObjectPropertyValue] || []), input]
               }));
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
                    setWordsLoaded(false);
                    populateWordList(settings.count)
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

                        // if (document.getElementsByClassName("letter").length != undefined) {
                        //     document.getElementsByClassName("letter")[0].classList.add("next"); // do we need this?
                        // }

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
