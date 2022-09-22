import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Login from './Pages/Login/Login'
import ClientHandler from './Client/Client'

function App() {
  let client:ClientHandler;
  let [getConn,setConn] = useState(false);

  function onJoin(USERNAME:string,IP:string){
    console.log(USERNAME + " : " + IP + " ON JOIN!");
    client = new ClientHandler(IP,USERNAME);
    setConn(true);
  }

    return (
      <div className="App">
        {!getConn && <Login onJoin={onJoin}/>}
      </div>
    )
}

export default App
