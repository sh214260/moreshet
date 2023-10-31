import React from "react";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from '../client/data-context';
import { Link } from "react-router-dom";
import axios from 'axios';
import Catalog from "./Catalog";
function Login() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [email, setEmail] = useState("")
    const [userpassword, setUserpassword] = useState("")
    const signin = () => {
        const option = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, userpassword
            })
        }
        console.log(option)
        // axios.post(`https://localhost:7128/api/User/GetUser/${email}/${userpassword}`, option)
        axios.post(`https://localhost:7128/api/User/Singin`, {email, userpassword})
        .then(ans => {
                console.log(ans.data)
                if (ans.data) {
                    alert("משתמש קיים")
                    context.setUser(ans.data[0]);
                    if (ans.data.type != 0)
                        navigate('/HomeAd')
                    else {
                        navigate('/Catalog')
                    }
                }
                else {
                    alert("לא קיים משתמש כזה")
                    navigate('/singup')
                }
            })
        setEmail("")
        setUserpassword("")
    }
    return (
        <div id="content">
            <p>
                <label for="email">  מייל: </label>
                <input name="email" type="email" onChange={(ev) => setEmail(ev.target.value)}></input>
            </p>
            <br></br>
            <p>
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


