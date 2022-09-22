import React, {useState} from 'react'
import styles from "./login.module.css";

type login = {
    onJoin:any,
}

const Login = ({onJoin}:login) => {
    const [getUsername,setUsername] = useState("");
    const [getIP,setIP] = useState("");

    return (
        <div className={styles.main}>
            <input onChange={(event) => {setUsername(event.target.value)}} placeholder='USERNAME' className={styles.inputM}/>
            <input onChange={(event) => {setIP(event.target.value)}} placeholder='IP ADRESS' className={styles.inputIP}/>

            <button onClick={() => {onJoin(getUsername,getIP)}} >JOIN</button>
        </div>
    )
}

export default Login