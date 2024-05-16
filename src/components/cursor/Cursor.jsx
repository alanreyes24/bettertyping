import React, { useEffect, useState } from 'react'

function Cursor() {

    const getOffset = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    const updateCursor = () => {

        if (document.getElementsByClassName('letter').length > 0) {


            let currentLetter = document.getElementsByClassName('letter')[0]

            let letterX = getOffset(currentLetter).left
            let letterY = getOffset(currentLetter).top

            document.getElementById('cursor').style.position = "absolute"
            document.getElementById('cursor').style.top = letterY + 'px'
            document.getElementById('cursor').style.left = letterX - 8 + 'px'
        } else {
            document.getElementById('cursor').style.opacity = 0;
        }

    }

    useEffect(() => {

        updateCursor()

    })

    return (
        <div id='cursor' style={{ marginLeft: '0.4rem', backgroundColor: 'white', height: '1.75rem', width: "0.1rem", transition: "all .15s ease-out", position: 'absolute', }} />

    )
}

export default Cursor