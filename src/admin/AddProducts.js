import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import { SERVERURL } from "../client/data-context";
import { Button, TextField, Typography } from "@mui/material";

const ariaLabel = { 'aria-label': 'description' };

function AddProducts() {
  const [name, setName] = useState('');
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId]=useState()
  const [price, setPrice] = useState('');
  const [image, setImage]=useState('')
  useEffect(() => {
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => {
        console.log(res.data)
        setCategorys(res.data)

      })
  }, [])


  const add = () => {
console.log(image)
    const dataforsend = { Id: 0, Name: name, CategoryId: categoryId, Price: price };
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataforsend)
    }
    console.log(option.body)
    axios.post(`${SERVERURL}/api/Product/addproduct`, dataforsend)
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
     <Typography>הוספת מוצר</Typography>
      <TextField
      placeholder="שם המוצר" inputProps={ariaLabel} onChange={(ev) => setName(ev.target.value)} />
      <TextField placeholder="מחיר" inputProps={ariaLabel} onChange={(ev) => setPrice(ev.target.value)} />
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
      <InputLabel>צרף תמונה</InputLabel>
      <Input type="file" onChange={(ev) => setImage(ev.target.files)}/>
      <Button variant="contained" onClick={add}>הוסף</Button>
    </div>
  );
}
export default AddProducts;