import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "./Nav";

import './NavStyle.css';
import Background from '../pictures/back2.png'
function HomePage() {
  return (
    <div id="home">
      {/* <h1>השכרת ציוד ומתנפחים</h1> */}
      <img src={Background} width="800px" height="150px"/>

      <Link to={"/login"}>התחבר</Link>

      <Nav />
      <Outlet />
      {/* <img src="./logo_moreshet"></img> */}
    </div>
  );
}
export default HomePage;

