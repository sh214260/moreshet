import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import '../client/styles/NavStyle.css'
function HomeAd() {
  const navigate = useNavigate();
  let navi = (name) => {
    navigate(`/${name}`)

  }
  return (
    <div id="home">
      <input type="button" value="הוספת מוצר" onClick={() => navi(`addProducts`)}></input>
      <input type="button" value="הלקוחות שלי" onClick={() => navi(`myclients`)}></input>
      <input type="button" value="הזמנות" onClick={() => navi(`allorders`)}></input>
    </div>
  );
}

export default HomeAd;