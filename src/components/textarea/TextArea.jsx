import React, { useEffect, useState } from "react";
import Word from "../word/Word";
import Cursor from "../cursor/Cursor";
import "./TextAreaStyles.css";

function TextArea({
  onTextFinished,
  passCorrectLetters,
  passIncorrectLetters,
  passCorrectWords,
  onTextStarted,
  onFocus,
  onFocusLost,
  settings,
  game,
}) {
  const [wordList, setWordList] = useState({});
  const [wordsLoaded, setWordsLoaded] = useState(false);

  const [correctLetters, setCorrectLetters] = useState({});
  const [incorrectLetters, setIncorrectLetters] = useState();

  const [currentCorrectLetterArray, setCurrentCorrectLetterArray] = useState(
    []
  );
  const [currentIncorrectLetterArray, setCurrentIncorrectLetterArray] =
    useState([]);
  const [currentLetterArrayIndexValue, setCurrentLetterArrayIndexValue] =
    useState(0);

  const [totalCorrectLetters, setTotalCorrectLetters] = useState(1);
  const [totalCorrectWords, setTotalCorrectWords] = useState(1);
  const [deleteLines, setDeleteLines] = useState(0);

  const [textTyped, setTextTyped] = useState("");

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false);

  useEffect(() => {
    if (shouldUpdateCursor && !game.isRunning) {
      document.getElementById("cursor").classList.add("cursorBlink");
    } else document.getElementById("cursor").classList.remove("cursorBlink");
  }, [shouldUpdateCursor, game.isRunning]);

  //////// LETTER STATE HANDLING
  useEffect(() => {
    if (game.isRunning) {
      setTimeout(() => {
        setCurrentLetterArrayIndexValue(currentLetterArrayIndexValue + 1);
      }, 1000);
      setIncorrectLetters({
        ...incorrectLetters,
        [currentLetterArrayIndexValue]: currentIncorrectLetterArray,
      });
      setCorrectLetters({
        ...correctLetters,
        [currentLetterArrayIndexValue]: currentCorrectLetterArray,
      });
    }
  }, [game.isRunning, currentCorrectLetterArray, currentIncorrectLetterArray]);

  useEffect(() => {
    if (game.isRunning) {
      setCurrentIncorrectLetterArray([]);
      setCurrentCorrectLetterArray([]);
    }
  }, [currentLetterArrayIndexValue]);

  useEffect(() => {
    passCorrectLetters(correctLetters);
  }, [correctLetters, passCorrectLetters]);

  useEffect(() => {
    passIncorrectLetters(incorrectLetters);
  }, [incorrectLetters, passIncorrectLetters]);
  //////// LETTER STATE HANDLING

  const focusInput = () => {
    document.getElementById("input").focus();
    onFocus();
    setShouldUpdateCursor(true);
    setWordsLoaded(true);
  };

  const wordMap = (amount) => {
    return new Promise((resolve) => {
      resolve(
        Array(amount)
          .fill(false)
          .map((_, i) => (
            <div key={i} className='word'>
              <Word key={i} />
            </div>
          ))
      );
    });
  };

  //extends the word list by amount
  function extendWordList(amount) {
    //define temporary array of new words
    let wordArr = Array(amount)
      .fill(false)
      .map((_, i) => (
        //key has + wordlist.length because react elements must have unique keys
        <div key={i + wordList.length} className='word'>
          <Word key={i + wordList.length} />
        </div>
      ));
    //define temp array of old words
    let arr = [...wordList];
    //for all new words, add to old words
    for (let i = 0; i < wordArr.length; i++) {
      arr.push(wordArr[i]);
    }
    setWordsLoaded(true);
    //set new word list
    setWordList(arr);
    console.log(wordList);
  }

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

  //how many words to load before test starts
  useEffect(() => {
    if (settings.type == "words") {
      populateWordList(settings.count);
    } else {
      populateWordList(50);
    }
  }, [settings.type, settings.count]);

  //check if total typed words
  useEffect(() => {
    if (settings.type != "words") {
      if (totalCorrectWords == wordList.length - 15) {
        setWordsLoaded(false);
        extendWordList(30);
      }
    }
  }, [totalCorrectWords]);

  //////// HANDLE USER INPUT
  const handleUserInput = (event) => {
    onTextStarted();
    setShouldUpdateCursor(true);

    let input = event.key;

    let lastLetter =
      document.getElementsByClassName("letter")[currentLetterIndex - 1];
    let currentLetter =
      document.getElementsByClassName("letter")[currentLetterIndex];
    let nextLetter =
      document.getElementsByClassName("letter")[currentLetterIndex + 1];

    if (input !== "Backspace") {
      setTextTyped(textTyped + input);

      if (getOffset(nextLetter).top != getOffset(currentLetter).top) {
        setDeleteLines(deleteLines + 1);
      }

      if (input == currentLetter.textContent) {
        if (currentLetter.textContent != " ") {
          setCurrentLetterIndex(currentLetterIndex + 1);
          setTotalCorrectLetters(totalCorrectLetters + 1);

          //set array of letters to have all correct
          setCurrentCorrectLetterArray([
            ...currentCorrectLetterArray,
            currentLetter.textContent,
          ]);

          passCorrectLetters(correctLetters);
        } else if (currentLetter.textContent == " ") {
          setTextTyped("");
          setTotalCorrectWords(totalCorrectWords + 1);
          passCorrectWords(totalCorrectWords);
        }

        currentLetter.classList.remove("incorrect");
        currentLetter.classList.remove("next");
        nextLetter.classList.add("next");
        currentLetter.classList.add("correct");
        setCurrentLetterIndex(currentLetterIndex + 1);
      } else if (
        input != currentLetter.textContent &&
        currentLetter.textContent != " "
      ) {
        currentLetter.classList.add("incorrect");
        currentLetter.classList.remove("next");
        nextLetter.classList.add("next");

        setCurrentIncorrectLetterArray([...currentIncorrectLetterArray, input]);

        setCurrentLetterIndex(currentLetterIndex + 1);
      }

      if (document.getElementsByClassName("letter").length == 1) {
        let currentLetter = document.getElementsByClassName("letter")[0];
        currentLetter.classList.remove("next");
        currentLetter.classList.remove("letter");

        setTotalCorrectWords(totalCorrectWords + 1);
        passCorrectWords(totalCorrectWords);
        setShouldUpdateCursor(false);
        onTextFinished();
      }
    } else if (input === "Backspace" && lastLetter != undefined) {
      lastLetter.classList.remove("correct");
      currentLetter.classList.remove("next");
      lastLetter.classList.remove("incorrect");
      setCurrentLetterIndex(currentLetterIndex - 1);
      setTextTyped(textTyped.slice(0, -1));
    }
  };

  return (
    <>
      <Cursor
        shouldUpdate={shouldUpdateCursor}
        currentLetter={currentLetterIndex}
      />
      <input
        onBlur={() => {
          setShouldUpdateCursor(false);
          onFocusLost();
          //   setWordsLoaded(false);
          //   populateWordList(settings.count);
        }}
        id='input'
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        type='text'
        data-gramm='false'
        data-gramm_editor='false'
        data-enable-grammarly='false'
        list='autocompleteOff'
        onKeyDown={(event) => {
          if (
            document.getElementsByClassName("letter").length > 1 &&
            !game.isFinished
          ) {
            handleUserInput(event);
          }
        }}
        style={{ opacity: 0, height: 0, width: 0 }}></input>
      <div style={{}} className='type__container'>
        <div
          onClick={() => {
            focusInput();

            if (document.getElementsByClassName("letter").length != undefined) {
              document
                .getElementsByClassName("letter")[0]
                .classList.add("next");
            }
          }}
          className='type__box'
          style={{
            marginTop: deleteLines > 1 ? (deleteLines - 1) * -2 + "rem" : 0,
          }}>
          {wordsLoaded == true ? <> {wordList} </> : <></>}
        </div>
      </div>
    </>
  );
}

export default TextArea;
