import React from "react";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {DataContext} from './data-context';
import { Link } from "react-router-dom";
import './styles/loginStyle.css'
function Login() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [email, setEmail] = useState({})
    const [userpassword, setUserpassword] = useState({})
    const signin = () => {
        
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, userpassword
            })
        }
        fetch('http://localhost:3500/login', option)
            .then(res => res.json())
            .then(ans => {
                setEmail(ans)
                setUserpassword(ans)
                console.log(ans)
                if (ans.length > 0) {
                    context.setUser(ans[0]);
                    if (ans[0].useradmin == 1) {
                        navigate('/HomeAd')
                    }
                    else {
                        console.log(ans)
                        navigate('/')
                    }
                }
                else {
                    alert("משתמש לא קיים")
                    navigate('/singup')
                }
            })
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