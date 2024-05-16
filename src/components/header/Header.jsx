import React from 'react'

function Header() {
    return (
        <div style={{ backgroundColor: 'red', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 700, fontSize: "2rem" }}>
                <a>bettertyping</a>
            </div>
            <div>
                <a>login</a>
            </div>
        </div>
    )
}

export default Header