import './App.css'
import Word from './components/word/Word';

import { React, useState } from 'react';

// import Word from './components/word/Word'

const handleUserInput = (event) => {

  let input = event.target.value;
  console.log(input)



  let currentLetter = document.getElementsByClassName('letter')[0]

  if (input == currentLetter.textContent) {
    currentLetter.classList.remove("incorrect")
    currentLetter.classList.add("correct")
    currentLetter.classList.remove("letter")


  } else {
    currentLetter.classList.add("incorrect")

  }

}

const placeWords = () => {
  return <Word />
}

function App() {


  return (

    <div style={{}}>
      <input id="input"
        onChange={(event) => {


          handleUserInput(event)
          event.target.value = "";


        }}
        style={{ opacity: 1 }}></input>




      <div className='type-box' style={{ margin: "4rem", background: '#404040', display: "flex", flex: 1, width: "100%", height: "100%" }}>

        {placeWords()}

      </div>

    </div>

  )
}

export default App
