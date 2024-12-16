import React, { useEffect, useState } from "react";

function Replay({ test }) {
  const [replay, setReplay] = useState({
    wordList: [],
    isRunning: false,
    state: 0, //-1 resetting, 0 loaded, 1 playing, 2 paused, 3 finished
  });

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

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
    setCurrentLetterIndex(0);
    const list = document.getElementsByClassName("replay");

    for (let item of list) {
      item.classList.remove("correct");
      item.classList.remove("incorrect");
    }
  };

  function playReplay() {
    const list = document.getElementsByClassName("replay");
    let spaces = 0;
    let delay = 0;

    test?.eventLog?.forEach((event, index) => {
      delay += event.delay;

      setTimeout(() => {
        if (event.intended != " ") {
          if (event.intended == event.typed) {
            list[index - spaces].classList.add("correct");
            console.log("found correct letter");
            setCurrentLetterIndex((prev) => prev + 1);
          } else if (event.typed == "Backspace") {
            console.log("backspace");

            list[index - spaces].classList.remove("incorrect");
            setCurrentLetterIndex((prev) => prev - 1);
          } else {
            list[index - spaces].classList.add("incorrect");
            setCurrentLetterIndex((prev) => prev + 1);
          }
        } else {
          spaces++;
          setCurrentLetterIndex((prev) => prev + 1);
        }
      }, delay);
    });

    setReplay((prev) => ({
      ...prev,
      state: 3,
    }));
  }

  useEffect(() => {
    if (replay.state == 1) {
      console.log("playing");
      playReplay();
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
              setReplay((prev) => ({
                ...prev,
                state: 1,
              }));
            }}
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3'>
            {replay.state == 0 ? "Play" : "Pause"}
          </button>
        </div>
      </div>

      <div className='mt-6'>
        <div className='rounded-lg inline-flex flex-wrap bg-gray-800'>
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
