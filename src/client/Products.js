import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './styles/productsStyle.css'

function Products() {
  //הפרמטר שיגיע מהניתוב בתך הריאקט
  const {category } = useParams()
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    let start = async () => {
      console.log(category)
      //axios.get('https://localhost:7128/api/User', option)
      const response = await axios.get('https://localhost:7128/api/Product')
      const data = await response.data
      console.log( data)
      console.log(data[0])
      setProducts(data)
      console.log(products)
      console.log(products.length > 0)

    }
     //start()
  })
  
  return (
    <>
      <h1 id="title">{title}</h1>
      <div id="sort">
          <p>מיין לפי:</p>
          <label htmlFor="price">מחיר</label>
          <input type="range" id="price" min="100" max="1200" step="200"></input>
          <br></br>
      </div>
      <div id="catalog">
        {
          products.map((it, index) => {
            return (
              <div /*key={index}*/ className="galary">
                { <Link to={`/products/${category}/${it.category}`}><img className="images" width="150px" src={`http://localhost:3500/image/${it.image}`} /></Link> }
                <div className="desc">
                  <p>{it.name}</p>
                  <p>{it.price} ₪</p></div>
              </div>
          )})
        }
      </div>

    </>
  )
}

export default Products