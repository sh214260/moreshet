import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './styles/productsStyle.css'

function Products() {
  //הפרמטר שיגיע מהניתוב בתך הריאקט
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  useEffect(() => {
    let start = async () => {
      console.log(category)
      const response = await fetch(`http://localhost:3500/products/${category}`)
      const data = await response.json()

      console.log("data")
      console.log(data)
      console.log("it")
      console.log(data.item)

      setProducts(data.item)
      setTitle(data.title)
      console.log(products.length > 0)

    }
    start()
  }, [category])
  console.log(products)
  return (
    <>
      <h1 id="title">{title}</h1>

      {/* <div id="sort">
          <p>מיין לפי:</p>
          <label htmlFor="price">מחיר</label>
          <input type="range" id="price" min="100" max="1000" step="200"></input>
          <br></br>

          
        </div> */}


      <div id="catalog">
        {

          products.map((it, index) => {
            return (
              <div key={index} className="galary">

                <Link to={`/products/${category}/${it.id}`}><img className="images" width="150px" src={`http://localhost:3500/image/${it.image}`} /></Link>

                <div className="desc">
                  <p>{it.productsName}</p>
                  <p>{it.price} ₪</p></div>
              </div>)
          })
        }
      </div>

    </>
  )
}

export default Products