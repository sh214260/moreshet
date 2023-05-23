import React from "react";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {DataContext} from '../client/data-context';
import { Link } from "react-router-dom";
import axios from 'axios';
import Catalog from "./Catalog";
// import './styles/loginStyle.css'
function Login() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [email, setEmail] = useState("")
    const [userpassword, setUserpassword] = useState("")
    const signin = () => {
        setEmail("")
        setUserpassword("")
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, userpassword
            })
        }
        axios.get('https://localhost:7128/api/User', option)
            .then(ans => {
                console.log(ans.data)               
                if (ans.data.length > 0) {
                    let visit=ans.data.find(it=> it.mail==email && it.password==userpassword)
                    console.log(visit)
                    let index=ans.data.indexOf(visit)
                    console.log(index)
                    if (index!=-1) {
                        alert("משתמש קיים")
                        context.setUser(ans.data[index]); 
                        if(ans.data[index].type!=0)                                               
                            navigate('/HomeAd')
                        else
                        {
                            navigate('/Catalog')
                        }
                    }
                    else {
                        alert("משתמש לא קיים")
                        navigate('/singup')
                    }
                }
                else{
                    alert("לא קיימים משתמשים")
                }
                
            })
            setEmail("")
            setUserpassword("")
    }
    return (
        <div id="content">
            <p className="p">
                <label for="email">  מייל: </label>
                <input name="email" type="email" onChange={(ev) => setEmail(ev.target.value)}></input>
            </p>
            <br></br>
            <p className="p">
                <label for="pass">סיסמה: </label>
                <input name="pass" type="password" onChange={(ev) => setUserpassword(ev.target.value)}></input>
                <br></br>
            </p>
            <input className="submit" type="submit" value="כניסה" onClick={signin}></input>
            <span className="tosingup">עוד לא רשום?<Link to="/singup">הרשם כאן</Link></span>
        </div>
    );
}
export default Login;