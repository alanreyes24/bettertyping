import React, { useEffect, useState } from "react";
import Word from "../word/Word";
import Cursor from "../cursor/Cursor";
import "./TextAreaStyles.css";

function TextArea({
  onTextFinished,
  passCorrectLetters,
  passIncorrectLetters,
  passWords,
  onTextLoaded,
  onTextStarted,
  onFocus,
  onFocusLost,
  test,
}) {
  const [wordList, setWordList] = useState([]);
  const [wordsLoaded, setWordsLoaded] = useState(false);

  const [correctLetters, setCorrectLetters] = useState();
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

  //////// LETTER STATE HANDLING
  useEffect(() => {
    if (test.state == 1) {
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
  }, [test.state, currentCorrectLetterArray, currentIncorrectLetterArray]);

  useEffect(() => {
    if (test.state == 1) {
      setCurrentIncorrectLetterArray([]);
      setCurrentCorrectLetterArray([]);
    }
  }, [test.state, currentLetterArrayIndexValue]);

  useEffect(() => {
    if (
      test.state == 1 &&
      JSON.stringify(test.words.correctLetters) !=
        JSON.stringify(correctLetters)
    ) {
      passCorrectLetters(correctLetters);
    }
  }, [correctLetters, passCorrectLetters]);

  useEffect(() => {
    if (
      test.state == 1 &&
      JSON.stringify(test.words.correctLetters) !=
        JSON.stringify(correctLetters)
    ) {
      passIncorrectLetters(incorrectLetters);
    }
  }, [incorrectLetters, passIncorrectLetters]);
  ////////

  //////// UTIL FUNCTIONS
  const focusInput = () => {
    document.getElementById("input").focus();
    onFocus();
    setShouldUpdateCursor(true);
    // setWordsLoaded(true);
  };

  const getOffset = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };
  ////////

  //////// WORD FUNCITONS
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

  async function populateWordList(amount) {
    const result = await wordMap(amount);
    setWordsLoaded(true);
    setWordList(result);
    onTextLoaded();
  }
  ////////

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
          setCurrentCorrectLetterArray([
            ...currentCorrectLetterArray,
            currentLetter.textContent,
          ]);
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

  //// PRE TEST WORD LOADING
  useEffect(() => {
    //if the test has not been started yet, (state 0) load the initial words
    if (test.state <= 0) {
      if (test.settings.type == "words") {
        populateWordList(test.settings.count);
      } else {
        populateWordList(50);
      }
    }
  }, [test.settings.type, test.settings.count, test.state]);

  ////LINE SHIFTING

  useEffect(() => {
    if (test.state == 1) {
      let currentLetter =
        document.getElementsByClassName("letter")[currentLetterIndex - 1];
      let nextLetter =
        document.getElementsByClassName("letter")[currentLetterIndex];

      if (currentLetter != undefined && nextLetter != undefined) {
        if (getOffset(nextLetter).top > getOffset(currentLetter).top) {
          setDeleteLines((d) => d + 1);
        } else if (getOffset(nextLetter).top < getOffset(currentLetter).top) {
          setDeleteLines((d) => d - 1);
        }
      }
    }
  }, [currentLetterIndex, test.state]);

  useEffect(() => {
    if (test.finished && test.words.wordList.length == 0) {
      passWords(wordList);
    }
  }, [test.finished]);

  //extends the word list by amount
  //TODO: someday make this extend only to size of box, no need for super long list that isnt even shown
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
    //set new word list
    setWordList(arr);
  }
  //if test is running
  if (test.state == 1) {
    // if not a words test, extend word list when run out of words!
    if (test.settings.type != "words") {
      if (totalCorrectWords >= wordList.length - 30) {
        extendWordList(50);
      }
    }
  }

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
          if (
            test.state == 0 &&
            document.getElementsByClassName("letter").length != undefined
          ) {
            onTextStarted();
            setShouldUpdateCursor(true);
            handleUserInput(event);
          } else if (
            test.state == 1 &&
            document.getElementsByClassName("letter").length != undefined
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
            marginTop: deleteLines > 1 ? (deleteLines - 1) * -2.5 + "rem" : 0,
          }}>
          {wordsLoaded ? wordList : <></>}
        </div>
      </div>
    </>
  );
}

export default TextArea;
