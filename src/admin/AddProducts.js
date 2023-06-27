import React from "react";
import { useState } from "react";
import axios from 'axios';
function AddProducts() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const add = () => {
   let _categoryId=0
    switch(category) {
      case "trampoline":
        _categoryId=0
        break;
      case "foodMachine":
        _categoryId=1
        break;
      case "evreything":
        _categoryId=2
        break;
      default:
        _categoryId=0
    }
    const dataforsend={Id:0,Name: name, CategoryId:_categoryId, Price:price};
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(dataforsend)
    }
    console.log(option.body)
    axios.post('https://localhost:7128/api/Product', dataforsend)
      .then(ans => console.log(ans))
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
      <br></br>
      <label for="nameOfProducts">הזן שם מוצר</label>
      <input name="nameOfProducts" type="text" onChange={(ev) => setName(ev.target.value)}></input>
      <br></br>
      <label for="price">מחיר</label>
      <input name="price" type="text" onChange={(ev) => setPrice(ev.target.value)}></input>
      <br></br>
      <label>צרף תמונה</label>
      <br></br>
      <input className="submit" type="submit" value="הוסף" onClick={add}></input>
    </div>
  );
}
export default AddProducts;