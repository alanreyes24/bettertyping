import React from 'react'


const words = ["miles", "reyes"]



const generateWord = () => {

    const word = words[0].split("");
    console.log(word)

    return word.map(item => <div className='letter' key={item}>{item}</div>)

}

function Word() {
    return (

        generateWord()

    )
}



export default Word