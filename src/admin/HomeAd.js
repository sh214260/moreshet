import React from "react";
import { Link } from "react-router-dom";
import '../client/NavStyle.css'
function HomeAd() {
  return (
    <div id="home">
      <ul>
      <li><Link to="update">עדכון מוצר</Link></li>
        <li><Link to="addProducts">הוספת מוצר</Link></li>
        <li><Link to="myOrder">הלקוחות שלי</Link></li>
      </ul>
    </div>
  );
}

export default HomeAd;