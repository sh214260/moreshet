import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

function Catalog() {
    //const { category } = useParams()
    const [products, setProducts] = useState([{}])
    const [category, setCategory]=useState()
    const [title, setTitle] = useState('')

    useEffect(() => {
        let start = async () => {
            console.log(category)
            const response = await axios.get('https://localhost:7128/api/Product')
            const data = await response.data
            console.log(data)
            setProducts(data)
            console.log(products)
            console.log(products.length > 0)
        }
        start()
    },[category])

    return (
        <>
            <h1 id="title">{title}</h1>
            <div id="sort">
                <label for="sortforcategory">מיין לפי</label>
                {/* <select name="sortforcategory"> */}
                 <select name="sortforcategory" onChange={(ev) => setCategory(ev.target.value)}> 
                    <option value="trampoline">מתנפחים</option>
                    <option value="foodMachine">מכונות מזון</option>
                    <option value="evreything">הכל לאירוע</option>
                </select>
                <label htmlFor="price">מחיר</label>
                <input type="range" id="price" min="100" max="1300" step="200"></input>
                <br></br>
            </div>
            <div id="catalog">
                {
                    products.map((it, index) => {
                        
                        return (
                            <div key={index} className="galary">
                                {/* {<Link to={`/products/${category}/${it.category}`}><img className="images" width="150px" src={`http://localhost:3500/image/${it.image}`} /></Link>} */}                                
                                <div className="desc">
                                    <p>{it.name}</p>
                                    <p>{it.price} ₪</p>
                                    <p>{it.categoryId}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Catalog