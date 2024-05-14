import React, { useState, useEffect, createElement } from "react";

function Word() {
    const [randomWord, setRandomWord] = useState('');

    useEffect(() => {
        fetch('https://random-word-api.herokuapp.com/word?length=5')
            .then(response => response.json())
            .then(data => setRandomWord(data[0]))
            .catch(error => console.error('Error fetching random word: ', error));
    }, []);

    let map = randomWord.split('').map((item, index) => createElement("div", { key: index, className: "letter" }, item));
    map.push(createElement("div", { key: 'space', className: "letter space" }, " "));

    return map;
}

export default Word;
