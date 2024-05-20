import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";
import Settings from "./components/settings/Settings";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import EndTest from "./components/endtest/EndTest";
import Test from "./components/test/Test";

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Header />
      <Login />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >

        <Test />
        {/* <p>{"CORRECT LETTERS " + correctLetters} </p>
        <p>{"INCORRECT LETTERS " + incorrectLetters} </p> */}

//         < EndTest 
//           //correctLetters = {correctLetters}
//           //incorrectLetters = {incorrectLetters}
//         />

      </div>
    </div>
  );
}

export default App;