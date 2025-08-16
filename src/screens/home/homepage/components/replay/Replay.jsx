import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

function Replay({ test }) {
  // Initialize replay state with event log from the test
  const [replay, setReplay] = useState({
    eventLog: test.eventLog || [],
    wordList: [],
    isRunning: false,
    frame: 0,
    letter: 0,
    delay: 0,
    spaces: 0,
    state: 0, //-1 resetting, 0 loaded, 1 playing, 2 paused, 3 finished
    letterStatus: [], // Array to track the status of each letter (correct/incorrect)
  });

  const createWordList = useCallback(() => {
    if (test.words && test.words.wordList && test.words.wordList.length > 0) {
      return test.words.wordList;
    }

    // Fallback if wordList isn't available directly
    if (test.eventLog && test.eventLog.length > 0) {
      const words = [];
      let currentWord = "";

      // Extract intended words from the event log
      for (const event of test.eventLog) {
        if (event.intended === " ") {
          if (currentWord) {
            words.push(currentWord);
            currentWord = "";
          }
        } else if (event.intended && event.intended !== "Backspace") {
          currentWord += event.intended;
        }
      }

      if (currentWord) {
        words.push(currentWord);
      }

      return words;
    }

    return [];
  }, [test.words, test.eventLog]);

  // Process the wordList when the test state changes
  useEffect(() => {
    if (test.state !== 0) {
      const wordList = createWordList();

      setReplay((prev) => ({
        ...prev,
        state: 0,
        wordList: wordList,
        letterStatus: Array(wordList.join("").length).fill(null), // Initialize letter status array
      }));
    } else {
      setReplay(() => ({
        eventLog: test.eventLog || [],
        wordList: [],
        isRunning: false,
        frame: 0,
        letter: 0,
        delay: 0,
        spaces: 0,
        state: 0, //-1 resetting, 0 loaded, 1 playing, 2 paused, 3 finished
        letterStatus: [],
      }));
    }
  }, [test.state, test.eventLog, createWordList]);

  // Reset replay to initial state
  const resetReplay = () => {
    setReplay((prev) => ({
      ...prev,
      state: -1, // Set to resetting state
    }));

    setTimeout(() => {
      setReplay((prev) => ({
        ...prev,
        frame: 0,
        letter: 0,
        delay: 0,
        spaces: 0,
        state: 0,
        letterStatus: Array(prev.wordList.join("").length).fill(null),
      }));
    }, 500);
  };

  // Process next frame of the replay
  useEffect(() => {
    // Early return if no event log or not in right state
    if (!test.eventLog || test.state === 0) {
      return;
    }

    // Handle playing state
    if (replay.state === 1 && replay.frame < test.eventLog.length) {
      // Create timeout for next frame
      const timeoutId = setTimeout(
        () => {
          const currentEvent = test.eventLog[replay.frame];

          // Clone the current letterStatus array to avoid direct mutation
          const newLetterStatus = [...replay.letterStatus];

          if (currentEvent.typed !== "Backspace") {
            if (currentEvent.intended !== " ") {
              // If current keystroke is a letter (not space or backspace)
              const isCorrect = currentEvent.intended === currentEvent.typed;

              // Update the status for this letter
              newLetterStatus[replay.letter] = isCorrect
                ? "correct"
                : "incorrect";

              setReplay((prev) => ({
                ...prev,
                letterStatus: newLetterStatus,
                letter: prev.letter + 1,
                frame: prev.frame + 1,
              }));
            } else {
              // If current keystroke is a space
              setReplay((prev) => ({
                ...prev,
                spaces: prev.spaces + 1,
                frame: prev.frame + 1,
              }));
            }
          } else {
            // If current keystroke is a backspace
            if (replay.letter > 0) {
              // Clear the status of the current letter
              newLetterStatus[replay.letter - 1] = null;

              setReplay((prev) => ({
                ...prev,
                letterStatus: newLetterStatus,
                letter: Math.max(0, prev.letter - 1),
                frame: prev.frame + 1,
              }));
            } else {
              // At the beginning, can't backspace further
              setReplay((prev) => ({
                ...prev,
                frame: prev.frame + 1,
              }));
            }
          }
        },
        // Calculate delay - use a reasonable default if the value is unrealistic
        test.eventLog[replay.frame] &&
          test.eventLog[replay.frame].delay > 0 &&
          test.eventLog[replay.frame].delay < 2000
          ? test.eventLog[replay.frame].delay
          : 120
      );

      // Cleanup function to clear timeout
      return () => clearTimeout(timeoutId);
    } else if (replay.state === 1 && replay.frame >= test.eventLog.length) {
      // Replay finished
      setReplay((prev) => ({
        ...prev,
        state: 3, // Set to finished state
      }));
    }
  }, [
    replay.state,
    replay.frame,
    replay.letter,
    replay.letterStatus,
    test.eventLog,
    test.state,
  ]);

  // Handle state changes
  useEffect(() => {
    if (replay.state === 1) {
      console.log("playing");
      // Playing state is handled by the frame update useEffect
    } else if (replay.state === 2) {
      console.log("paused");
    } else if (replay.state === 3) {
      console.log("finished");
    } else if (replay.state === -1) {
      console.log("resetting");
      // Actual reset happens in resetReplay function
    }
  }, [replay.state]);

  // Get letter status class
  const getLetterClass = (letterIndex) => {
    const status = replay.letterStatus[letterIndex];
    if (status === "correct") return "correct";
    if (status === "incorrect") return "incorrect";
    return "";
  };

  // Calculate absolute letter index for styling
  const getAbsoluteLetterIndex = (wordIndex, letterIndex) => {
    let absoluteIndex = 0;
    for (let i = 0; i < wordIndex; i++) {
      absoluteIndex += replay.wordList[i].length;
    }
    absoluteIndex += letterIndex;
    return absoluteIndex;
  };

  return (
    <div className="w-full mx-auto col-span-2 lg:col-span-5 rounded-lg border bg-card p-6 h shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">replay</h2>
          <p className="text-muted-foreground">
            watch a real time playback of your test
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setReplay((prev) => ({
                ...prev,
                state: prev.state === 1 ? 2 : 1,
              }));
            }}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            {replay.state === 1 ? "pause" : "play"}
          </button>
          <button
            onClick={resetReplay}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            restart
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-lg inline-flex flex-wrap overflow-scroll h-48">
          {replay.wordList.map((word, wordIndex) => (
            <div className="flex-row flex mr-7 lg:mr-4" key={wordIndex}>
              {word.split("").map((letter, letterIndex) => {
                const absoluteIndex = getAbsoluteLetterIndex(
                  wordIndex,
                  letterIndex
                );
                const letterClass = getLetterClass(absoluteIndex);

                return (
                  <div className={`letter ${letterClass}`} key={letterIndex}>
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Replay;
