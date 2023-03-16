import React, { useState,useContext } from "react";
import {DataContext} from './data-context';
import { Navigate, useNavigate } from "react-router-dom";
import './styles/loginStyle.css'
//import { Link } from "react-router-dom";

function Singup() {
      // const navigate=useNavigate()
    const context = useContext(DataContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [userpassword, setUserpassword] = useState('')
    const validate = (field) =>{
        if(field.length === 0){
            alert(`please enter all fields`);
            return false;
        }
        return true;
    }
    const singup = () => {
        if(validate(username) === false) return;
        if(validate(phone) === false) return;
        if(validate(email) === false) return;
        if(validate(userpassword) === false) return;

        if(phone.length > 10){
            alert("phone number too long");
            return;
        }

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
        .then(res => res.json())
        .then(ans => {
                setUsername(ans)
                setPhone(ans)
                setEmail(ans)
                setUserpassword(ans)
                console.log(email);
                console.log(ans)
                if (ans !==null) {
                    console.log("hihi");
                    alert("נרשמת בהצלחה!")
                    context.setUser(ans[0]);
                    navigate('/login')
                    
                }
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
                    <input name="email" type="email" placeholder="*שדה חובה" onChange={(ev) => setEmail(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="pass">סיסמה: </label>
                    <input name="pass" type="password"  onChange={(ev) => setUserpassword(ev.target.value)} placeholder="*שדה חובה"></input>
                </p> 
                <input className="submit" type="submit" value="הרשם" onClick={singup}></input>

            </div>
        </>
    )
}
export default Singup;