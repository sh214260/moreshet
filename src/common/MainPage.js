import React, { useContext } from "react";
import Video from "./Video";
import { Link, Outlet} from "react-router-dom";


function MainPage() {
    return (
        <div>
            <ul id="menu">
                <li><Link to="/album">קטלוג</Link></li>
                <li><Link to="/signin">התחברות🙋‍♂️</Link></li>
                
            </ul>
            <Video />
        </div>
    )
}


export default MainPage;

