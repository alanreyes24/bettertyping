import React, { createElement } from "react";

const words = ["miles", "reyes", "drip", "swag", "end"];

function Word() {
    const word = words[Math.floor(Math.random() * 5)].split("");


    let map = word.map((item, _) => createElement("div", { key: _, className: "letter" }, item));

    map.push(createElement("div", { className: "letter space" }, " "))

    return map
}

export default Word;
