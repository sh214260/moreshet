import React from "react";
import { useState } from "react";
import axios from 'axios';
function AddProducts() {
const [category, setCategory]=useState('');
const[name, setName]=useState('');
const add=()=>{
  const option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        category, name
    })
  }
  axios.post('https://localhost:7128/api/Product',option)
  .then(res=>res.json()).catch(err=>console.log(err))
}
  return (
    <div >
      <h1>הוספת מוצר</h1>
      <label for="chooseCategory">בחר קטגוריה</label>
      <select name="chooseCategory" onChange={(ev) => setCategory(ev.target.value)}>
        <option value="trampoline">מתנפחים</option>
        <option value="foodMachine">מכונות מזון</option>
        <option value="evreything">הכל לאירוע</option>
      </select>
      <label for="nameOfProducts">הזן שם מוצר</label>
      <input name="nameOfProducts" type="text" onChange={(ev) => setName(ev.target.value)}></input>
      <label for="price">מחיר</label>
      <input name="price" type="text"></input>
      {/* <label for="discription">תאור</label>
      <input name="discription" type="text"></input> */}
      {/* <label for="height">גובה</label>
      <input name="height" type="text"></input>
      <label for="width">רוחב</label>
      <input name="width" type="text"></input> */}
      <label>צרף תמונה</label>
      <input className="submit" type="submit" value="הוסף" onClick={add}></input>
    </div>
  );
}
export default AddProducts;