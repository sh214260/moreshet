import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from './data-context';

import './styles/items.css'

function Item() {
  const params = useParams()
  const navigate = useNavigate()
  const context = useContext(DataContext)
  const [item, setItem] = useState(null)
  const [date, setDate] = useState('')
  useEffect(() => {
    console.log(params)
    fetch(`http://localhost:3500/products/item/${params.productId}`)
      .then(response => response.json()).then(data => {
        console.log(data)
        setItem(data[0])

      })
  }, [])
  const check = () => {
    fetch(`http://localhost:3500/products/item/${params.productId}/${date}`)
      .then(res => res.json()).then(res => {
        console.log(res)
        if (res.length > 0) {
          alert("המוצר תפוס")
        } 
        else {
          alert("המוצר נוסף בהצלחה!")
          context.addItem({ item: item, date: date, price: item.price });
        }
      })
  }
  return (
    <>
      {item != null ?
        <>
          <h1 id="nameP">{item.productsName}</h1>
          <div id="content">
            <div id="imgItem">
              <img id="img" src={`http://localhost:3500/image/${item.image}`} alt={item.name} />
            </div>
            <div id="imgDetails">{
              item.products_id === 1 ? <>
                <p>תאור: <span> {item.descrip} </span></p>
                <p>גובה: <span> {item.width} על {item.height} מטרים</span></p>
              </> : <></>}<p>מחיר:
                <span> {item.price} ₪ </span></p>
              <label for="date">בתאריך:</label>
              <input type="date" name="date" onChange={(ev) => setDate(ev.target.value)}></input>
              <br></br>   <input type="submit" value="הוסף להזמנה" onClick={check}></input>
            </div>
          </div>
        </>
        : <div>Loading... please wait</div>
      }
    </>
  )
}
export default Item;