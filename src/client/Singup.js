import React, { useState,useContext } from "react";
import {DataContext} from './data-context';
import { Navigate, useNavigate } from "react-router-dom";
import './styles/loginStyle.css'
import axios from "axios";
import { Button, Input } from "@mui/material";
//import { Link } from "react-router-dom";

function Singup() {
      // const navigate=useNavigate()
    const context = useContext(DataContext)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const validate = (field) =>{
        if(field.length === 0){
            alert(`please enter all fields`);
            return false;
        }
        return true;
    }
    const singup = () => {
        if(validate(name) === false) return;
        if(validate(phonenumber) === false) return;
        if(validate(email) === false) return;
        if(validate(password) === false) return;
        if(validate(address) === false) return;

        if(phonenumber.length > 10){
            alert("phone number too long");
            return;
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, name, phonenumber,address
            })
        }
       const singupBody={email, password, name, phonenumber, address}
        axios.post('https://localhost:7128/api/User/Singup', singupBody)
       // .then(res => res.json())
        .then(ans => {
                setName(ans)
                setPhoneNumber(ans)
                setEmail(ans)
                setPassword(ans)
                setAddress(ans)
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
        <Input>הכנס</Input>
            <h1>הרשמה</h1>
            <div id="content">
                <p className="p">
                    <label for="username">שם: </label>
                    <input name="username" type="text" onChange={(ev) => setName(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="phone">טלפון: </label>
                    <input name="phone" type="text" onChange={(ev) => setPhoneNumber(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="email">מייל: </label>
                    <input name="email" type="email" placeholder="*שדה חובה" onChange={(ev) => setEmail(ev.target.value)}></input>
                </p><br></br>
                <p className="p">
                    <label for="pass">סיסמה: </label>
                    <input name="pass" type="password"  onChange={(ev) => setPassword(ev.target.value)} placeholder="*שדה חובה"></input>
                </p> 
                <p className="p">
                    <label for="address">כתובת: </label>
                    <input name="address" type="text"  onChange={(ev) => setAddress(ev.target.value)} placeholder="*שדה חובה"></input>
                </p>
                <input className="submit" type="submit" value="הרשם" onClick={singup}></input>

            </div>
        </>
    )
}
export default Singup;