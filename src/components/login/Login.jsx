import React from "react";

function Login() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#333' }}>
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#2D3748', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <input placeholder="username" style={{
                        backgroundColor: '#2D3748',
                        color: '#E2E8F0',
                        border: 'none',
                        borderRadius: '8px',
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
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        marginBottom: '16px',
                        outline: 'none',
                        transition: 'background-color 0.15s ease-in-out',
                        '&:focus': {
                            backgroundColor: '#252945'
                        }
                    }} type="password" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <label style={{ fontSize: '14px', color: '#E2E8F0', cursor: 'pointer' }} htmlFor="remember-me">
                            <input style={{ marginRight: '8px' }} id="remember-me" type="checkbox" />
                            remember me
                        </label>
                        <a style={{ fontSize: '14px', color: '#509EF0', textDecoration: 'underline', marginBottom: '.125rem' }} href="#">forgot password?</a>
                        <p style={{ color: '#FFF', marginTop: '16px' }}>don't have an account? <a style={{ fontSize: '14px', color: '#509EF0', textDecoration: 'underline', marginTop: '16px' }} href="#">signup</a></p>
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#E2E8F0', marginBottom: '16px', alignSelf: "center"}}>login</h2>
                </form>
            </div>
        </div>
    );
}

export default Login;