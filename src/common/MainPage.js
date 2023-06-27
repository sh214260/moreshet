import React, { useContext } from "react";
import Video from "./Video";
import Login from "./Login";
import { Link, Outlet, useNavigate } from "react-router-dom";


function MainPage() {
    return (
        <div>
            <ul id="menu">
                <li><Link to="/catalog">קטלוג</Link></li>
                <li><Link to="/login">התחברות🙋‍♂️</Link></li>
            </ul>
            <Video />
        </div>
    )
}


export default MainPage;

