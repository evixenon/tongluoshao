import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import ToolApp from './ToolApp';

function App() {
  const [toolName, setToolName] = useState('');
  
  function changeApp(name: string) {
    if (name === '') return; 
    setToolName(name);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <label>
          选择工具：
          <button className='App-link' onClick={() =>{changeApp('Decider')}}>做决定机</button>
          <button className='App-link' onClick={() =>{changeApp('TodoList')}}>Todo</button>
        </label>
        <img src={logo} className="App-logo" alt="logo" />

        <ToolApp name={toolName} />
      </header>
    </div>
  );
}

export default App;
