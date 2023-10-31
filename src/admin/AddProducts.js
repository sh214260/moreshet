import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

const ariaLabel = { 'aria-label': 'description' };

function AddProducts() {
  const [name, setName] = useState('');
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId]=useState()
  const [price, setPrice] = useState('');
  useEffect(() => {
    axios.get('https://localhost:7128/api/Category/Get')
      .then(res => {
        console.log(res.data)
        setCategorys(res.data)

      })
  }, [])


  const add = () => {

    const dataforsend = { Id: 0, Name: name, CategoryId: categoryId, Price: price };
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataforsend)
    }
    console.log(option.body)
    axios.post('https://localhost:7128/api/Product/addproduct', dataforsend)
      .then(ans => {
        console.log(ans);
        if (ans.data) {
          alert("המוצר נוסף בהצלחה!")
          setCategorys('')
          setName('')
          setPrice('')
          Input.value = ''
        }
        else {
          alert("כבר קיים מוצר עם אותו שם")
        }
      })

  }
  return (
    <div >
      <h1>הוספת מוצר</h1>
      <Input placeholder="שם המוצר" inputProps={ariaLabel} onChange={(ev) => setName(ev.target.value)} />
      <br></br>
      <Input placeholder="מחיר" inputProps={ariaLabel} onChange={(ev) => setPrice(ev.target.value)} />
      <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
      <Select 
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={categoryId}
        onChange={(ev) => setCategoryId(ev.target.value)}
      >

        {categorys.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
        ))}
      </Select>
      <br></br>
      <label>צרף תמונה</label>
      <br></br>
      <input className="submit" type="submit" value="הוסף" onClick={add}></input>
    </div>
  );
}
export default AddProducts;