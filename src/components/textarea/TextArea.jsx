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
  test,
  settings,
}) {
  const [wordList, setWordList] = useState([]);
  const [wordsLoaded, setWordsLoaded] = useState(false);

  const [correctLetters, setCorrectLetters] = useState({});
  const [incorrectLetters, setIncorrectLetters] = useState();

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
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

  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false);

  useEffect(() => {
    if (shouldUpdateCursor && test.state == 0) {
      document.getElementById("cursor").classList.add("cursorBlink");
    } else document.getElementById("cursor").classList.remove("cursorBlink");
  }, [shouldUpdateCursor, test.state]);

  //   //////// LETTER STATE HANDLING
  //   useEffect(() => {
  //     if (game.isRunning) {
  //       setTimeout(() => {
  //         setCurrentLetterArrayIndexValue(currentLetterArrayIndexValue + 1);
  //       }, 1000);
  //       setIncorrectLetters({
  //         ...incorrectLetters,
  //         [currentLetterArrayIndexValue]: currentIncorrectLetterArray,
  //       });
  //       setCorrectLetters({
  //         ...correctLetters,
  //         [currentLetterArrayIndexValue]: currentCorrectLetterArray,
  //       });
  //     }
  //   }, [game.isRunning, currentCorrectLetterArray, currentIncorrectLetterArray]);

  //   useEffect(() => {
  //     if (game.isRunning) {
  //       setCurrentIncorrectLetterArray([]);
  //       setCurrentCorrectLetterArray([]);
  //     }
  //   }, [currentLetterArrayIndexValue]);

  //   useEffect(() => {
  //     passCorrectLetters(correctLetters);
  //   }, [correctLetters, passCorrectLetters]);

  //   useEffect(() => {
  //     passIncorrectLetters(incorrectLetters);
  //   }, [incorrectLetters, passIncorrectLetters]);
  //   //////// LETTER STATE HANDLING

  const focusInput = () => {
    document.getElementById("input").focus();
    onFocus();
    setShouldUpdateCursor(true);
    // setWordsLoaded(true);
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

  //how many words to load before test starts

  //////// WORD FUNCITONS

  //extends the word list by amount
  //TODO: someday make this extend only to size of box, no need for super long list that isnt even shown
  function extendWordList(amount) {
    //define temporary array of new words
    console.log("in extendo");

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
    console.log(arr);
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

  //////// HANDLE USER INPUT
  const handleUserInput = (event) => {
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

          //   passCorrectLetters(correctLetters);
        } else if (currentLetter.textContent == " ") {
          setTextTyped("");
          setTotalCorrectWords(totalCorrectWords + 1);

          //   passCorrectWords(totalCorrectWords);
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

      //CHECKING IF LAST LETTER
      if (
        document.getElementsByClassName("letter").length ==
        currentLetterIndex + 2
      ) {
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

  //// START NEW EVERYTHING HERE :)

  useEffect(() => {
    //if the test has not been started yet, (state 0) load the initial words

    if (test.settings.type == "words") {
      populateWordList(test.settings.count);
    } else {
      populateWordList(5);
    }

    //if test is running
    if (test.state == 1) {
      // if not a words test, extend word list when run out of words!
      if (test.settings.type != "words") {
        if (totalCorrectWords == wordList.length - 1) {
          console.log("extendo!");
          extendWordList(30);
        }
      }
    }
  }, [test.settings.count, test.settings.type, test.state, totalCorrectWords]);

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
          //if test isnt started yet, tell test we have started the text input!
          if (test.state == 0) {
            onTextStarted();
            setShouldUpdateCursor(true);
            handleUserInput(event);
          } else if (test.state == 1) {
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
          {wordsLoaded ? wordList : <></>}
        </div>
      </div>
    </>
  );
}

export default TextArea;
