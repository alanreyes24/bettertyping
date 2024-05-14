import React, { Component, createElement, useEffect } from 'react'
import Word from '../word/Word'
import Cursor from '../cursor/Cursor';



function TextArea() {

    const focusInput = () => {
        document.getElementById("input").focus()
    }

    useEffect(() => {
        focusInput()
    })

    const handleUserInput = (event) => {

        let input = event.target.value;
        console.log(input)

        let currentLetter = document.getElementsByClassName('letter')[0]
        let nextLetter = document.getElementsByClassName('letter')[1]


        if (input == currentLetter.textContent) {
            currentLetter.classList.remove("incorrect")
            currentLetter.classList.remove("next")

            nextLetter.classList.add("next")

            currentLetter.classList.add("correct")

            currentLetter.classList.remove("letter")



        } else {

            currentLetter.classList.add("incorrect")

        }
    }

    return (
        <>

            <input id="input"
                onChange={(event) => {
                    handleUserInput(event)
                    event.target.value = "";
                }}
                style={{ opacity: 0 }}></input>

            <div onClick={() => {
                focusInput()

                console.log("click")

            }} className='type-box' style={{ margin: "4rem", background: '#404040', display: "flex", flex: 1, width: "80%", height: "40rem" }}>
                {Array(10).fill(false).map((_, i) => <Word key={i} />)}
            </div>
        </>

    )
}

export default TextArea
