import React from "react";
import { useState, useEffect } from "react";
import './styles/NavStyle.css';
import { Link } from "react-router-dom";
import video from '../pictures/video.mp4'

function Nav() {
  return (<div>
    <nav id="stick">
      <ul id="menu">
        <li><Link to="/products/1">מתנפחים</Link></li>
        <li><Link to="/products/2">מכונות מזון</Link></li>
        <li><Link to="/products/3">הכל לאירוע</Link></li>
        <li><Link to="/orders">ההזמנות שלי</Link></li>
      </ul>
      {/* <video  width="300px"><surce src={video} type="video/mp4"/></video> */}
    </nav>
  </div>
  )
}
export default Nav;