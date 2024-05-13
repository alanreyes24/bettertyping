import React, { createElement } from "react";

const words = ["miles", "reyes", "drip", "swag", "end"];

function Word() {
    const word = words[Math.floor(Math.random() * 5)].split("");

    let map = word.map((item, i) => createElement("div", { key: i, className: "letter" }, item));

    map.push(createElement("div", { className: "letter space" }, " "))

    console.log(map)

    return map
}

{
    /* < div className = 'letter' key = { i } > { item }</div > */
}

export default Word;
