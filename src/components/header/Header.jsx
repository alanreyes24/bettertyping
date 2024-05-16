import React from 'react'

function Header() {
    return (
        <div style={{ boxSizing: 'border-box', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: '1rem', width: '100vw', alignItems: 'center' }}>

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