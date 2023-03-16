import React, { useContext } from "react";

import { Link, Outlet,useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { DataContext } from "./data-context";
import './styles/NavStyle.css';
import Background from '../pictures/back2.png'
import Importent from '../pictures/importent.png'


function HomePage() {
  const navigate = useNavigate()
  const context = useContext(DataContext);
  
  function out(){
    console.log(context.user.username);
    context.setUser(null)
    context.setItems(null)
   
    navigate("/")
  }
  return (
    <div id="home" height="400px">
      {/* <h1>השכרת ציוד ומתנפחים</h1> */}
      <img src={Background} width="770px" height="150px"/>
      <Nav />
      {context.user == null ?
        <Link to={"/login"}>התחבר</Link>
      :
        <><span>שלום {context.user.username}!</span><br></br><button id="out" onClick={out}>התנתק</button> 
      </>}
      
      
      <Outlet />
      <br></br>
      
      
      <div> <img src={Importent} width="770px"  /></div>
      {/* <img src="./logo_moreshet"></img> */}
    </div>
  );
}
export default HomePage;

