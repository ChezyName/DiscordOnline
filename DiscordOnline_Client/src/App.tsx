import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Login from './Pages/Login/Login'
import ClientHandler from './Client/Client'

function App() {
  function onJoin(USERNAME:string,IP:string){
    console.log(USERNAME + " : " + IP + " ON JOIN!");
    new ClientHandler(IP,USERNAME);
  }

    return (
      <div className="App">
        <Login onJoin={onJoin}/>
      </div>
    )
}

export default App
