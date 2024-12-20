import React, { useEffect, useState } from "react";

function Replay({ test }) {
  const [replay, setReplay] = useState({
    wordList: [],
    isRunning: false,
    frame: 0,
    letter: 0,
    delay: 0,
    spaces: 0,
    state: 0, //-1 resetting, 0 loaded, 1 playing, 2 paused, 3 finished
  });

  const [delayArray, setDelayArray] = useState([]);

  useEffect(() => {
    let builder = [];
    let local = "";

    if (test.state == 4) {
      const list = document.getElementsByClassName("letter");

      for (let item of list) {
        if (!item.classList.contains("space")) {
          local += item.innerHTML;
        } else {
          builder.push(local);
          local = "";
        }
      }

      setReplay((prev) => ({
        ...prev,
        state: 0,
        wordList: builder,
      }));
    }
  }, [test.state]);

  const resetReplay = () => {
    const list = document.getElementsByClassName("replay");

    setReplay((prev) => ({
      ...prev,
      state: 1,
    }));

    setTimeout(() => {
      for (let item of list) {
        item.classList.remove("correct");
        item.classList.remove("incorrect");
      }
    }, 500);

    setReplay((prev) => ({
      ...prev,
      frame: 0,
      letter: 0,
      delay: 0,
      spaces: 0,
      state: 0,
    }));
  };

  const list = document.getElementsByClassName("replay");

  if (replay.state == 1 && replay.frame != test.eventLog.length) {
    if (replay.frame == 0) {
      for (let item of list) {
        item.classList.remove("correct");
        item.classList.remove("incorrect");
      }
    }
    //if running go to next frame
    //needs to be controlled based on letter not frame (calculate letter from frame info)
    setTimeout(
      () => {
        if (test.eventLog[replay.frame].typed != "Backspace") {
          if (test.eventLog[replay.frame].intended != " ") {
            if (
              test.eventLog[replay.frame].intended ==
              test.eventLog[replay.frame].typed
            ) {
              list[replay.letter].classList.add("correct");
            } else {
              list[replay.letter].classList.add("incorrect");
            }
            setReplay((prev) => ({
              ...prev,
              letter: prev.letter + 1,
            }));
          } else {
            setReplay((prev) => ({
              ...prev,
              // letter: prev.letter + 1,
              spaces: prev.spaces + 1,
            }));
          }
        } else {
          //backspaces
          //delete current class, make letter move backwards, but frame forwards
          //make sure not on first letter

          if (replay.letter >= 0) {
            console.log(list[replay.letter]);

            if (list[replay.letter].classList.contains("correct")) {
              list[replay.letter].classList.remove("correct");
            }

            if (list[replay.letter].classList.contains("incorrect")) {
              list[replay.letter].classList.remove("incorrect");
            }

            if (replay.letter > 0) {
              setReplay((prev) => ({
                ...prev,
                letter: prev.letter - 1,
              }));
            } else {
              setReplay((prev) => ({
                ...prev,
                letter: 0,
              }));
            }
          }
        }

        setReplay((prev) => ({
          ...prev,
          delay: delayArray[replay.frame],
          frame: prev.frame + 1,
        }));
      },
      test.eventLog[replay.frame].delay > 0
        ? test.eventLog[replay.frame].delay
        : 0
    );
  } else if (replay.state == 1 && replay.frame == test.eventLog.length + 1) {
    setReplay((prev) => ({
      ...prev,
      state: 3,
    }));
  }
  useEffect(() => {
    if (replay.state == 1) {
      console.log("playing");
      // playReplay();
    } else if (replay.state == 2) {
      console.log("paused");
    } else if (replay.state == 3) {
      console.log("finished");
    } else if (replay.state == -1) {
      console.log("resetting");
      resetReplay();
    }
  }, [replay.state]);

  return (
    <div className='w-full mx-auto col-span-2 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold'>Replay</h2>
          <p className='text-muted-foreground'>
            Watch a real time playback of your test!
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => {
              replay.state == 1
                ? setReplay((prev) => ({
                    ...prev,
                    state: 2,
                  }))
                : setReplay((prev) => ({
                    ...prev,
                    state: 1,
                  }));
            }}
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3'>
            {replay.state == 0 ? "Play" : "Pause"}
          </button>
          <button
            onClick={() => {
              resetReplay();
            }}
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3'>
            Restart
          </button>
        </div>
      </div>

      <div className='mt-6'>
        <div className='rounded-lg inline-flex flex-wrap overflow-scroll h-48'>
          {replay.wordList.map((word, index) => (
            <div className='flex-row flex mr-7' key={index}>
              {word.split("").map((letter, i) => (
                <div className='letter replay' key={i}>
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Replay;
