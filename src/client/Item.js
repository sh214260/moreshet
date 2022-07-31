import React from "react";
import { useState, useEffect,useParams } from "react";
//import { useNavigate } from "react-router-dom";
import './items.css'

function Item() {
  const params = useParams()
  //משתנה בשביל רשימת המוצרים המתאימה לקטגוריה
  const [products, setProducts] = useState([])
  //פונקציה המרחשת בכל שינוי ובפנים שולפת מהשרת נתונים מתאימים
  //הנתונים שחוזרים מהשרת נכנסים לרשימה
  useEffect(() => {
    console.log(params)
    fetch(`http://localhost:3500/products/${params.category}`)
      .then(response => response.json()).then(data => {
        console.log(data)
        setProducts(data.details)
        
      })
}, [])

return (
    <>
    <h1>item</h1>
      <div id="content">
        <div id="imgItem">
          <img>תמונה</img>
        </div>
        <div id="imgDetails">
        {
        products.map((details, i) => {
              <div  key={i}>
                <img />
                <p>{details.name}</p>
                <p>{details.description}</p>
                <p>{details.size}</p>
                <p>{details.price} ש"ח</p>
              </div>
            })
          }
          <label for="date">בתאריך:</label>
          <input type="date" name="date"></input>
        </div>
       </div>
    </>
  )
}
export default Item;