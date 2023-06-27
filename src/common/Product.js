import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from '../client/data-context'
import axios from 'axios';
// import './styles/items.css'

function Product() {
  const params = useParams()
  const navigate = useNavigate()
  const context = useContext(DataContext)
  const [item, setItem] = useState(null)
  const [date, setDate] = useState('')
  useEffect(() => {
    console.log(params)
    axios.get(`https://localhost:7128/api/Product/${params.id}`)
      .then(res => {
        console.log(res.data)
        setItem(res.data)

      })
  }, [])
  const check = () => {
    // fetch(`'https://localhost:7128/api/Product'${params.productId}/${date}`)
    //   .then(res => res.json()).then(res => {
    //     console.log(res)
    //     if (res.length > 0) {
    //       alert("המוצר תפוס")
    //     } else {
    //       alert("המוצר נוסף בהצלחה!")
    //       context.addItem({ item: item, date: date, price: item.price });
    //     }
    //   })
  }
  const add=()=>{
    context.addItem({ item: item, date: date, price: item.price });

    // Navigate to the cart component
    navigate('/cart');
  }
  return (
    <>
      {item != null ?
        <>
          <h1 id="nameP">{item.name}</h1>
          <div id="content">
            {/* <div id="imgItem">
              <img id="img" src={`http://localhost:3500/image/${item.image}`} alt={item.name} />
            </div> */}
            <div id="imgDetails">{
              item.id === 1 ? <>
              </> : <></>}<p>מחיר:
                <span> {item.price} ₪ </span></p>
              <label for="date">בתאריך:</label>
              <input type="date" name="date" onChange={(ev) => setDate(ev.target.value)}></input>
              <br></br>   <input type="submit" value="הוסף להזמנה" onClick={add}></input>
            </div>
          </div>
        </>
        : <div>Loading... please wait</div>
      }
    </>
  )
}
export default Product;