import React, { Component, createElement } from 'react'
import Word from '../word/Word'


export default class TextArea extends Component {

    placeWords = () => {

        for (let i = 0; i < 10; i++) {
            document.getElementsByClassName('type-box')[0].appendChild(document.createElement('div'))
        }

    }

    componentDidMount() {
        this.placeWords()

    }


    render() {

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




        return (
            <>
                <input id="input"
                    onChange={(event) => {


                        handleUserInput(event)
                        event.target.value = "";


                    }}
                    style={{ opacity: 1 }}></input>

                <div className='type-box' style={{ margin: "4rem", background: '#404040', display: "flex", flex: 1, width: "100%", height: "100%" }}>
                    {Array(4).fill(true).map((_, i) => <Word key={i} />)}
                </div>
            </>

        )
    }
}
