import React, { useState } from "react";
import './loginStyle.css'
//import { Link } from "react-router-dom";

function Singup() {

    //    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [userpassword, setUserpassword] = useState('')
    const singup = () => {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, userpassword, username, phone
            })
        }
        fetch('http://localhost:3500/login/signup', option)
            .then(ans => {
                console.log(ans)
                setUsername(ans)
                setPhone(ans)
                setEmail(ans)
                setUserpassword(ans)
            })
    }

    return (
        <>
            <h1>הרשמה</h1>
            <div id="content">
                <p className="p">
                    <label for="username">שם: </label>
                    <input name="username" type="text" onChange={(ev) => setUsername(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="phone">טלפון: </label>
                    <input name="phone" type="text" onChange={(ev) => setPhone(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="email">מייל: </label>
                    <input name="email" type="email" onChange={(ev) => setEmail(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="pass">סיסמה: </label>
                    <input name="pass" type="password" onChange={(ev) => setUserpassword(ev.target.value)}></input>
                </p> <br></br>
                <input id="submit" type="submit" value="הרשם" onClick={singup}></input>

            </div>
        </>
    )
}
export default Singup;