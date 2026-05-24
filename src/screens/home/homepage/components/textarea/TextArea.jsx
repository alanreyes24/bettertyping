import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react";

import Word from "../word/Word";
import axios from "axios";
import Cursor from "../cursor/Cursor";
import "./TextAreaStyles.css";
// import { start } from "repl";

function TextArea({
  user,
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
    [],
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
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const inputRef = useRef(null);

  // Tracks in-flight keydowns so we can compute pressLength on keyup.
  // Keyed by event.code (stable across modifier changes).
  // Each entry: { downTime: number, eventIndex: number }
  const keyDownInfoRef = useRef({});

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onFocus();
    setShouldUpdateCursor(true);
  }, [onFocus]);

  // Focus on mount and whenever test state resets
  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (test.state === 0) {
      focusInput();
    }
  }, [test.state, focusInput]);

  // Re-focus when the user clicks the page — but NOT when they click an
  // interactive element (e.g. a login input on another part of the page).
  useEffect(() => {
    const handleWindowClick = (e) => {
      if (
        e.target.closest(
          "input, textarea, select, button, a, [contenteditable=true], [role='textbox'], [role='button']",
        )
      ) {
        return;
      }
      focusInput();
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [focusInput]);

  // Re-focus when window/tab regains focus — unless another input already
  // has focus (user was mid-typing in something else when they tabbed back).
  useEffect(() => {
    const handleWindowFocus = () => {
      const active = document.activeElement;
      if (
        active &&
        active !== inputRef.current &&
        active.matches?.(
          "input, textarea, select, [contenteditable=true], [role='textbox']",
        )
      ) {
        return;
      }
      focusInput();
    };

    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [focusInput]);

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
        extendWordList(30);
      }
    }

    if (reset) {
      setWordList([]);
      setEventLog([]);
      setCorrectLetters([]);
      setLastTimestamp(0);
      setStartTime(0);
      setCurrentLetterArrayIndexValue(0);
      setCurrentLetterIndex(0);
      setDeleteLines(0);
      keyDownInfoRef.current = {}; // clear in-flight keydowns
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
      console.log("passing");
      passEventLog(eventLog);
    }
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

  const getOffset = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };

  const wordMap = async (amount) => {
    let arr = Array(amount)
      .fill(false)
      .map((_, i) => (
        <div key={i} className="word">
          <Word selectedDifficulty={selectedDifficulty} />
        </div>
      ));

    return arr;
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
        <div key={i + wordList.length} className="word">
          <Word selectedDifficulty={selectedDifficulty} />
        </div>
      ));
    setWordList((prev) => [...prev, ...wordArr]);
  }

  const handleUserInput = (event) => {
    const input = event.key;

    if (input == "Shift") return;

    // Ignore auto-repeat keydowns so they don't overwrite the original downTime
    // for an already-held key.
    if (event.repeat) return;

    const currentLetter =
      document.getElementsByClassName("letter")[currentLetterIndex];
    const nextLetter =
      document.getElementsByClassName("letter")[currentLetterIndex + 1];

    // Capture "now" once so all timing math is consistent on this keystroke.
    const now = Date.now();
    const isFirstKey = !startTime;
    const effectiveStart = startTime || now;

    if (isFirstKey) {
      setStartTime(now);
    }

    // Timestamp relative to the start of the test (0 on first keystroke).
    const timestamp = now - effectiveStart;

    // Delay from previous keystroke (0 on first keystroke).
    const delay = isFirstKey ? 0 : now - lastTimestamp;

    // Store absolute epoch ms consistently so the next keystroke can subtract.
    setLastTimestamp(now);

    if (currentLetter.textContent != undefined) {
      // Capture the keydown so onKeyUp can fill in pressLength later.
      // Using the functional updater means prevLog.length is the correct,
      // race-free index for the entry we're about to push.
      const code = event.code;
      setEventLog((prevLog) => {
        const eventIndex = prevLog.length;
        keyDownInfoRef.current[code] = { downTime: now, eventIndex };
        return [
          ...prevLog,
          {
            intended: currentLetter.textContent,
            typed: input,
            startTime: effectiveStart,
            timestamp,
            delay,
            pressLength: null, // filled in on keyup
          },
        ];
      });

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
          console.log("calling on finished");
          onTextFinished();
        }
        console.log(
          currentLetterIndex + 2,
          document.getElementsByClassName("letter").length,
        );
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

  const handleKeyUp = (event) => {
    if (event.key === "Shift") return;

    const info = keyDownInfoRef.current[event.code];
    if (!info) return;

    const pressLength = Date.now() - info.downTime;
    delete keyDownInfoRef.current[event.code];

    setEventLog((prev) => {
      // Guard against a reset clearing the log between down and up.
      if (!prev[info.eventIndex]) return prev;
      const updated = [...prev];
      updated[info.eventIndex] = {
        ...updated[info.eventIndex],
        pressLength,
      };
      return updated;
    });
  };

  return (
    <>
      <div>
        <Cursor
          shouldUpdate={shouldUpdateCursor}
          currentLetter={currentLetterIndex}
        />
        <input
          ref={inputRef}
          autoFocus
          onBlur={() => {
            setShouldUpdateCursor(false);
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
          onKeyUp={handleKeyUp}
          style={{
            position: "absolute",
            opacity: 0,
            left: "-9999px",
            width: "1px",
            height: "1px",
          }}
        />

        <div className="rounded-lg w-full h-44 overflow-hidden ">
          <div
            onClick={focusInput}
            className=""
            style={{
              marginTop: deleteLines > 1 ? (deleteLines - 1) * -2.5 + "rem" : 0,
            }}
          >
            {wordsLoaded ? wordList : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default TextArea;
