import './App.css'
import Word from './components/word/Word';
import Timer from './components/timer/Timer';
import TextArea from './components/textarea/TextArea';

import { React, useState, useEffect } from 'react';
import Cursor from './components/cursor/Cursor';

function App() {

  const [startTimer, setStartTimer] = useState(false)
  const [timerLength, setTimerLength] = useState(30);

  return (

    <div style={{ overflow: 'hidden' }}>
      <button onClick={() => {
        setStartTimer(false)
        setTimerLength(15)
      }}>15</button>
      <button onClick={() => {
        setStartTimer(false)
        setTimerLength(30)
      }}>30</button>
      <button onClick={() => {
        setStartTimer(false)
        setTimerLength(60)
      }}>60</button>
      <button onClick={() => {

        setStartTimer(!startTimer)

      }}>Start</button>
      <Timer time={timerLength} start={startTimer} />
      <Cursor />
      <TextArea />

    </div>

  )
}

export default App
