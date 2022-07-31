import React from "react";

function AddProducts() {
  return (
    <div >
      <h1>הוספת מוצר</h1>
      <label for="chooseCategory">בחר קטגוריה</label>
      <select name="chooseCategory">
        <option value="trampoline">מתנפחים</option>
        <option value="foodMachine">מכונות מזון</option>
        <option value="evreything">הכל לאירוע</option>
      </select>
      <label for="nameOfProducts">הזן שם מוצר</label>
      <input name="nameOfProducts" type="text"></input>
      <label for="price">מחיר</label>
      <input name="price" type="text"></input>
      <label for="discription">תאור</label>
      <input name="discription" type="text"></input>
      <label for="height">גובה</label>
      <input name="height" type="text"></input>
      <label for="width">רוחב</label>
      <input name="width" type="text"></input>
      <label>צרף תמונה</label>
    </div>
  );
}
export default AddProducts;