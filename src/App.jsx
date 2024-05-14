import './App.css'
import Word from './components/word/Word';
import TextArea from './components/textarea/TextArea';

import { React, useState, useEffect } from 'react';
import Cursor from './components/cursor/Cursor';

function App() {

  return (

    <div style={{ overflow: 'hidden' }}>
      <Cursor />
      <TextArea />

    </div>

  )
}

export default App
