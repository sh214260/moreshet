import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import { SERVERURL } from "../client/data-context";
import { Box, Button, Container, Grid, IconButton, InputAdornment, Paper, TextField, Typography, createTheme } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";
import cloud from '../pictures/upload-cloud.png'
import { Delete } from "@mui/icons-material";
const ariaLabel = { 'aria-label': 'description' };

function AddProducts() {
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)'
    },
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    length: 0.0,
    width: 0.0,
    categoryId: 0,
    weight: false,
    comment: '',
    type: '',
    image: ''
  });

  const handleChange = (field, value) => {
    setNewProduct(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const reset = () => {
    setNewProduct(prevState => ({
      ...prevState,
      name: '',
      description: '',
      price: 0,
      length: 0.0,
      width: 0.0,
      categoryId: 0,
      weight: false,
      comment: '',
      type: '',
      image: ''
    }))
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg' || file.type === 'pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        console.log(reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPG image file.');
    }
  };
  useEffect(() => {
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
  }, [])

  const add = () => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    }
    console.log(option.body)
    axios.post(`${SERVERURL}/api/Product/addproduct`, newProduct)
      .then(ans => {
        console.log(ans);
        if (ans.data) {
          alert("המוצר נוסף בהצלחה!")
        }
        else {
          alert("כבר קיים מוצר עם אותו שם")
        }
      })
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
      <Paper style={{ width: 1000, marginTop: 50, marginBottom: 20 }}>
        <Grid display="flex" flexDirection="column" style={{width:800, marginTop: 10, marginBottom: 50, marginRight: 100, marginLeft: 100 }}>
          <Typography variant="h4" align="right">הוספת מוצר</Typography>
          <Grid display="flex" flexDirection="row">
            <Box
              sx={{
                mb: 3,
                mt: 1,
                height: 120,
                width: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: "2px dashed",
                borderRadius: 8,
                borderColor: '#001a4c40'
              }}>
              <label htmlFor="fileInput">
                <img
                  style={{ height: 86, width: 86, cursor: 'pointer' }}
                  src={cloud}
                  alt="Cloud Image"
                />
                <Typography sx={{ color: theme.palette.blueColor, position: 'absolute', bottom: 5 }}>
                  הוספת תמונה
                </Typography>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </Box>
            <Box >  {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginRight: 20, width: 150, height: 150 }} />}
            </Box></Grid>
          <Grid container spacing={5}>
            <Grid item xs={4} padding={0}>
              <InputLabel>שם מוצר</InputLabel>
              <TextField size="small"
                value={newProduct.name}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                placeholder="992" onChange={(ev) => handleChange('name', ev.target.value)} />
              <InputLabel>תאור</InputLabel>
              <TextField multiline
                value={newProduct.description}
                rows={4} size="small" sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  }, width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                placeholder="992" onChange={(ev) => handleChange('description', ev.target.value)} />

            </Grid>
            <Grid item xs={4}>
              <InputLabel>מחיר</InputLabel>
              <TextField size="small"
                value={newProduct.price}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ש"ח</InputAdornment>,
                }} sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  }, width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                onChange={(ev) => handleChange('price', ev.target.value)} />
              <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
              <Select
                sx={{
                  '& .MuiSelect-icon': { right: 'auto', left: 8 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  },
                }}
                labelId="demo-simple-select-filled-label"
                value={newProduct.categoryId}
                size="small"
                onChange={(ev) => handleChange('categoryId', ev.target.value)}
                style={{ width: 180, marginBottom: 8, backgroundColor: theme.palette.customColor }}>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
              <InputLabel id="demo-simple-select-filled-label">משקל</InputLabel>
              <Select
                sx={{
                  '& .MuiSelect-icon': { right: 'auto', left: 8 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  },
                }}
                size="small"
                labelId="demo-simple-select-filled-label"
                value={newProduct.weight}
                onChange={(ev) => handleChange('weight', ev.target.value)}
                style={{ width: 180, backgroundColor: theme.palette.customColor }}>
                <MenuItem value={false} >קל</MenuItem>
                <MenuItem value={true}>כבד</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="sizes">מידות</InputLabel>
              <Grid display="flex" flexDirection="row">
                <TextField labelId="sizes"
                  value={newProduct.length} size="small" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 80, marginBottom: 2, backgroundColor: theme.palette.customColor
                  }}
                  onChange={(ev) => handleChange('length', ev.target.value)}
                />
                <TextField disabled
                  size="small" defaultValue="x" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 50, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                  }} />
                <TextField labelId="sizes"
                  value={newProduct.width} size="small" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 80, marginBottom: 2, marginLeft: 0, backgroundColor: theme.palette.customColor
                  }}
                  onChange={(ev) => handleChange('width', ev.target.value)} />
              </Grid>
              <InputLabel>הערה</InputLabel>
              <TextField multiline
                value={newProduct.comment}
                rows={4} size="small" fullWidth sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  }, width: 180, backgroundColor: theme.palette.customColor
                }}
                placeholder="992" onChange={(ev) => handleChange('comment', ev.target.value)} />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row" mt={3}>
            <Button variant="contained" style={{ backgroundColor: theme.palette.blueColor, width: "70%", borderRadius: 12, marginLeft: 20 }}
              onClick={add}>הוסף</Button>
            <Button variant="outlined" style={{ width: "30%", borderRadius: 12, }}
              onClick={reset}>

              איפוס
            </Button>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
}
export default AddProducts;