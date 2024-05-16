import React from 'react'

import './SettingsStyles.css'

function Settings() {
    return (



        <div className='modal__container'>


            <div className='modal__subcontainer' >
                <div className='modal__title' style={{ alignSelf: "center" }}>type</div>
                <div className='modal__option__container' style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '1rem' }}>
                    <div className='modal__option selected' style={{}}>time</div>
                    <div className='modal__option' style={{ marginLeft: '3rem' }}>words</div>
                </div>

            </div>

            <div className='modal__subcontainer'>
                <div className='modal__title' style={{ alignSelf: "center", marginTop: '1rem' }}>length</div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '1rem' }}>
                    <div className='modal__option' style={{}}>15</div>
                    <div className='modal__option selected' style={{ marginLeft: '2rem' }}>30</div>
                    <div className='modal__option' style={{ marginLeft: '2rem' }}>60</div>
                </div>

            </div>

            <div className='modal__close' style={{ alignSelf: 'flex-end', color: '#FF5757' }}>close</div>
        </div>
    )
}

export default Settings