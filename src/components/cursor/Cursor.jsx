import React, { useEffect, useState } from 'react'

function Cursor(props) {



    const getOffset = (element) => {
        console.log('getoffset called')
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    const updateCursor = () => {
        console.log('update called')
        let currentLetter = document.getElementsByClassName('letter')[0]

        console.log(currentLetter)

        let letterX = getOffset(currentLetter).left
        let letterY = getOffset(currentLetter).top

        console.log(letterX)
        console.log(letterY)


        document.getElementById('cursor').style.position = "absolute"
        document.getElementById('cursor').style.top = letterY + 'px'
        document.getElementById('cursor').style.left = letterX + 'px'

        console.log(document.getElementById('cursor').style.left)
        console.log(document.getElementById('cursor').style.top)
    }

    useEffect(() => {

        console.log('useeffect called')
        updateCursor()

    })

    return (
        <div id='cursor' style={{ position: 'absolute', color: 'gold', fontSize: '8rem' }}>
            |
        </div>
    )
}

export default Cursor