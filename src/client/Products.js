import React, { useEffect, useState } from "react";
// import {} from 'react-usestateref';
// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './productsStyle.css'

function Products() {
  //הפרמטר שיגיע מהניתוב בתך הריאקט
  const { category } = useParams()
  //משתנה בשביל רשימת המוצרים המתאימה לקטגוריה
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  //פונקציה המרחשת בכל שינוי ובפנים שולפת מהשרת נתונים מתאימים
  //הנתונים שחוזרים מהשרת נכנסים לרשימה
  useEffect(()=>{
    let start =async () => {
    console.log(category)
   const response =await fetch(`http://localhost:3500/products/${category}`)
      const data = await response.json()
     
        console.log("data")
        console.log(data)
        console.log("it")
        console.log(data.item)

        setProducts(data.item)
        setTitle(data.title)
        console.log(products.length>0)
        
    }
    start()
  }, [category])

  return (
    <>
      <h1 id="title">{title}</h1>
      <div id="front">
        <div id="sort">
          <p>מיין לפי:</p>
          <label htmlFor="price">מחיר</label>
          <input type="range" id="price" min="100" max="1000" step="200"></input>
          <br></br>

          {/* <p>גיל</p> 
          <div>
          <input type="radio" name="all" id="all" />
          <label htmlFor="all">כל הגילאים</label>
          
          <input type="radio" name="small"  id="small"/>
          <label htmlFor="small">עד גיל 10</label>
         
          <input type="radio" name="big" id="big"/>
          <label htmlFor="big">10 ומעלה</label>
          </div>  
          
  <input type="submit" value="סנן"></input> */}
        </div>


        <div className="images">תמונה
          {
            products.length>0?
            products.map((it, index) => {
              <div className="i"  key={index}>

                <h3>{it}</h3>
                <img src={`http://localhost:3500/image/${it.image}`} />

                <p>{it.price} ש"ח</p>
              </div>
            }):<></>
          }
        </div>
      </div>
    </>
  )
}

export default Products