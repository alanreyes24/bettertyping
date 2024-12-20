import React, { useEffect, useState, useReducer } from "react";

import Word from "../word/Word";
import axios from "axios";
import Cursor from "../cursor/Cursor";
import "./TextAreaStyles.css";

function TextArea({
  user,
  aiMode,
  selectedDifficulty,
  onTextFinished,
  passEventLog,
  passCorrectLetters,
  passIncorrectLetters,
  passWords,
  onTextLoaded,
  onTextStarted,
  onFocus,
  test,
  reset,
  onReset,
}) {
  const [wordList, setWordList] = useState([]);
  const [wordsLoaded, setWordsLoaded] = useState(false);
  let correctLettersArray = [];

  const [correctLetters, setCorrectLetters] = useState({});
  const [incorrectLetters, setIncorrectLetters] = useState({});

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

  const [eventLog, setEventLog] = useState([]);
  const [startTime, setStartTime] = useState(0);

  const [AIWordList, setAIWordList] = useState([" "]);

  async function retrieveAIWordList() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ai/getAIWordList`,
        { withCredentials: true }
      );
      if (response.status >= 200 && response.status < 300) {
        setAIWordList(response.data.practiceWords);
      } else {
        console.error("Failed to retrieve AI word list:", response.statusText);
      }
    } catch (error) {
      console.error("Error retrieving AI word list:", error.message);
    }
  }

  useEffect(() => {
    // handle line shifting
    if (test.state === 1) {
      const currentLetter =
        document.getElementsByClassName("letter")[currentLetterIndex - 1];
      const nextLetter =
        document.getElementsByClassName("letter")[currentLetterIndex];

      if (currentLetter && nextLetter) {
        if (getOffset(nextLetter).top > getOffset(currentLetter).top) {
          setDeleteLines((prev) => prev + 1);
        } else if (getOffset(nextLetter).top < getOffset(currentLetter).top) {
          setDeleteLines((prev) => prev - 1);
        }
      }
    }
  }, [currentLetterIndex, test.state]);

  useEffect(() => {
    // make words show up
    if (test.state == -1) {
      if (test.settings.type === "words") {
        populateWordList(test.settings.count);
      } else {
        populateWordList(50);
      }
    }

    // extend word list
    if (test.state === 1 && test.settings.type !== "words") {
      if (currentLetterIndex / 5 >= wordList.length - 30 && !reset) {
        // console.log("extending")
        // console.log(wordList.length)
        extendWordList(30);
      }
    }

    if (reset) {
      setWordList([]);
      setCorrectLetters([]);
      setCurrentLetterArrayIndexValue(0);
      setCurrentLetterIndex(0);
      setDeleteLines(0);
      onReset();
    }
  }, [
    test.settings.type,
    test.settings.count,
    test.state,
    currentLetterIndex,
    currentLetterArrayIndexValue,
    wordList,
    reset,
  ]);

  // track letters for errors by second
  useEffect(() => {
    if (
      JSON.stringify(test.words.incorrectLetters) !==
      JSON.stringify(incorrectLetters)
    ) {
      passIncorrectLetters(incorrectLetters);
    }

    if (
      JSON.stringify(test.words.correctLetters) !==
      JSON.stringify(correctLetters)
    ) {
      passCorrectLetters(correctLetters);
    }

    if (
      test.state === 3 &&
      JSON.stringify(test.eventLog) !== JSON.stringify(eventLog)
    ) {
      passEventLog(eventLog);
    }

    // if (test.state === 3 && test.words.attemptedWords === 0) {
    //   const arr = Array.from(
    //     { length: totalCorrectWords },
    //     (_, i) => document.getElementsByClassName("word")[i].textContent
    //   );
    //   setTimeout(() => {
    //     passWords(arr);
    //   }, 0);
    // }
  }, [currentLetterArrayIndexValue, test.state, test.timer.timeLeft]);

  useEffect(() => {
    setIncorrectLetters((prev) => ({
      ...prev,
      [currentLetterArrayIndexValue]: currentIncorrectLetterArray,
    }));
    setCorrectLetters((prev) => ({
      ...prev,
      [currentLetterArrayIndexValue]: currentCorrectLetterArray,
    }));

    if (test.timer.timeLeft % 10 == 0 && test.state == 1 && !test.finished) {
      setCurrentLetterArrayIndexValue((prev) => prev + 1);
    }
    if (test.state == 1 && test.timer.timeLeft % 10 == 0) {
      setCurrentIncorrectLetterArray([]);
      setCurrentCorrectLetterArray([]);
    }
  }, [test.state, test.timer.timeLeft, test.finished]);

  // cursor blinking
  const cursor = document.getElementById("cursor");
  if (cursor) {
    if (shouldUpdateCursor && test.state === 0) {
      cursor.classList.add("cursorBlink");
    } else {
      cursor.classList.remove("cursorBlink");
    }
  }

  const focusInput = () => {
    const input = document.getElementById("input");
    if (input) {
      input.focus();
    }
    onFocus();
    setShouldUpdateCursor(true);
  };

  const getOffset = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };

  const wordMap = async (amount) => {
    if (aiMode && AIWordList.length) {
      await retrieveAIWordList();
      return Array(amount)
        .fill(false)
        .map((_, i) => (
          <div key={i} className='word'>
            <Word word={AIWordList[i % AIWordList.length]} />
          </div>
        ));
    } else {
      let arr = Array(amount)
        .fill(false)
        .map((_, i) => (
          <div key={i} className='word'>
            <Word selectedDifficulty={selectedDifficulty} />
          </div>
        ));

      return arr;
    }
  };

  async function populateWordList(amount) {
    const result = await wordMap(amount);
    setWordsLoaded(true);
    setWordList(result);
    onTextLoaded();
  }

  function extendWordList(amount) {
    let wordArr = Array(amount)
      .fill(false)
      .map((_, i) => (
        <div key={i + wordList.length} className='word'>
          <Word selectedDifficulty={selectedDifficulty} />
        </div>
      ));
    setWordList((prev) => [...prev, ...wordArr]);
  }

  const handleUserInput = (event) => {
    const input = event.key;

    if (input == "Shift") return;

    const currentLetter =
      document.getElementsByClassName("letter")[currentLetterIndex];
    const nextLetter =
      document.getElementsByClassName("letter")[currentLetterIndex + 1];
    const timestamp = Date.now() - startTime;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (currentLetter.textContent != undefined) {
      setEventLog((prevLog) => [
        ...prevLog,
        {
          timestamp,
          intended: currentLetter.textContent,
          typed: input,
        },
      ]);

      if (input !== "Backspace") {
        setTextTyped((prev) => prev + input);

        if (input === currentLetter.textContent) {
          if (currentLetter.textContent !== " ") {
            setCurrentCorrectLetterArray((prev) => [...prev, input]);
            setTotalCorrectLetters((prev) => prev + 1);
          } else {
            setTotalCorrectWords((prev) => prev + 1);
            setCurrentCorrectLetterArray((prev) => [...prev, input]);
            setTextTyped("");
          }
          currentLetter.classList.remove("incorrect");
          currentLetter.classList.add("correct");
          if (nextLetter) nextLetter.classList.add("next");
          setCurrentLetterIndex((prev) => prev + 1);
        } else {
          currentLetter.classList.add("incorrect");
          setCurrentIncorrectLetterArray((prev) => [...prev, input]);
          if (nextLetter) nextLetter.classList.add("next");
          setCurrentLetterIndex((prev) => prev + 1);
        }

        if (
          document.getElementsByClassName("letter").length ===
          currentLetterIndex + 2
        ) {
          onTextFinished();
        }
      } else if (input === "Backspace" && currentLetterIndex > 0) {
        const lastLetter =
          document.getElementsByClassName("letter")[currentLetterIndex - 1];
        if (lastLetter) {
          lastLetter.classList.remove("correct");
          lastLetter.classList.remove("incorrect");
        }
        setCurrentLetterIndex((prev) => prev - 1);
        setTextTyped((prev) => prev.slice(0, -1));
      }
    }
  };

  return (
    <>
      <div>
        <Cursor
          shouldUpdate={shouldUpdateCursor}
          currentLetter={currentLetterIndex}
        />
        <input
          onBlur={() => {
            setShouldUpdateCursor(false);
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
              test.state === 0 &&
              document.getElementsByClassName("letter").length
            ) {
              onTextStarted();
              setShouldUpdateCursor(true);
              handleUserInput(event);
            } else if (test.state === 1) {
              handleUserInput(event);
            }
          }}
          style={{ opacity: 0, height: 0, width: 0 }}
        />

        <div className='rounded-lg w-full h-44 overflow-hidden '>
          <div
            onClick={focusInput}
            className=''
            style={{
              marginTop: deleteLines > 1 ? (deleteLines - 1) * -2.5 + "rem" : 0,
            }}>
            {wordsLoaded ? wordList : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default TextArea;
