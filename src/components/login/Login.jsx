import React, { useEffect, useState } from "react";
import "./Login.css";

function Login({loginVisible}) {

    const [showLogin, setLoginVisible] = useState(loginVisible)

    useEffect( () => {

        setLoginVisible(loginVisible);

    },[loginVisible])

  
    return (

        
        <div style={{ display: showLogin ? "flex":"none" , flexDirection: 'column', position: 'absolute', alignItems: 'center', top: '50%', left: '50%', justifyContent: 'center', transformOrigin: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#2D3748', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <input placeholder="username" style={{
                        backgroundColor: '#2D3748',
                        color: '#E2E8F0',
                        borderBottom: '1px solid white',
                        padding: '8px',
                        marginBottom: '16px',
                        outline: 'none',
                        transition: 'background-color 0.15s ease-in-out',
                        '&:focus': {
                            backgroundColor: '#252945'
                        }
                    }} type="email" />
                    <input placeholder="password" style={{
                        backgroundColor: '#2D3748',
                        color: '#E2E8F0',
                        borderBottom: '1px solid white',
                        padding: '8px',
                        marginBottom: '16px',
                        outline: 'none',
                        transition: 'background-color 0.15s ease-in-out',
                        '&:focus': {
                            backgroundColor: '#252945'
                        }
                    }} type="password" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <a style={{ fontSize: '14px', color: '#509EF0', textDecoration: 'underline', marginTop: '16px' }} href="#">signup</a>
                    </div>
                    <a style={{ fontSize: '24px', fontWeight: 'bold', color: '#E2E8F0', marginBottom: '16px', alignSelf: "center"}}>login</a>
                </form>
            </div>
        </div>
    );
}

export default Login;