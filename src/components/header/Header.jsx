import React, { useEffect, useState } from "react";
import Login from "../login/Login";
function Header() {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <div style={{ boxSizing: 'border-box', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: '1rem', width: '100vw', alignItems: 'center' }}>

            <div style={{ fontWeight: 700, fontSize: "2rem" }}>
                <a>bettertyping</a>
            </div>
            <div>
                <a onClick={() => {setShowLogin(!showLogin)}}>login</a>
                <Login loginVisible={showLogin}/>
            </div>
        </div>
    )
}

export default Header