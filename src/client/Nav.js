import React from "react";
import { useState, useEffect } from "react";
import './NavStyle.css';
import { Link } from "react-router-dom";

function Nav() {
  return (<div>
    <nav id="stick">
      <ul id="menu">
        <li><Link to="/products/1">מתנפחים</Link></li>
        <li><Link to="/products/2">מכונות מזון</Link></li>
        <li><Link to="/products/3">הכל לאירוע</Link></li>
        <li><Link to="/orders">ההזמנות שלי</Link></li>
      </ul>
    </nav>
  </div>
  )
}
export default Nav;