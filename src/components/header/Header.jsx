import React from 'react'

function Header() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '1rem' }}>
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