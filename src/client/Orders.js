import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import './orderStyle.css'

function Orders() { //הפרמטר שיגיע מהניתוב בתך הריאקט
  // const params = useParams()
  //משתנה בשביל רשימת המוצרים המתאימה לקטגוריה

  const [title, setTitle] = useState('')
  //פונקציה המרחשת בכל שינוי ובפנים שולפת מהשרת נתונים מתאימים
  //הנתונים שחוזרים מהשרת נכנסים לרשימה
  // useEffect(() => {
  //   console.log(params)
  //   fetch(`http://localhost:3500/order`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)

  //       setTitle(data.title)
  //     })
  // }, [])


  return (
    <>
      <h1>ההזמנות שלי</h1>
      <div id="all">
        <div id="table">
          <table>
            <tr>
              <th>תמונה</th>
              <th>שם</th>
              <th>מחיר</th>
              <th>תאריך</th>
            </tr>
            <tr>
              <td>img</td>
              <td>מכונת סוכר</td>
              <td>170</td>
              <td>5/7/20</td>
            </tr>
          </table>
        </div>
        <div id="confirm">
          <label>סה"כ לתשלום</label>
          <br></br>
          <input type="submit" value="אישור הזמנה"></input>
        </div>
      </div>
    </>
  )
}
export default Orders