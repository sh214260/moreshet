import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataContext, SERVERURL } from "../client/data-context";
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography, createTheme } from "@mui/material";
import cloud from '../pictures/upload-cloud.png';
import { useParams } from "react-router-dom";
const ariaLabel = { 'aria-label': 'description' };

const UpdateProduct = () => {
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)'
      
    },
  });
  const params = useParams(0);
  const ctx = useContext(DataContext)
  const [imageFile, setImageFile] = useState();
  const [imageData, setImageData] = useState('');
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState({
    id: 0,
    image: '',
    name: '',
    description: '',
    price: 0,
    specialPrice: 0,
    length: 0.0,
    width: 0.0,
    height: 0.0,
    categoryId: 0,
    weight: false,
    comment: '',
    type: '',

  });

  function handleChange(field, value) {
    console.log(field, value);
    setNewProduct(prevState => ({
      ...prevState,
      [field]: value
    }))
    return true;
  };
  const reset = () => {
    setNewProduct(prevState => ({
      ...prevState,
      name: '',
      description: '',
      price: 0,
      specialPrice: 0,
      length: 0.0,
      width: 0.0,
      height: 0.0,
      categoryId: 0,
      weight: false,
      comment: '',
      type: '',
      image: ''
    }))
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      console.log(file)
      setImageFile(file)
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      alert('קובץ לא נתמך');
    }
  };
  useEffect(() => {
    console.log(params);
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
    if (params.id != 0) {
      axios.get(`${SERVERURL}/api/Product/getbyid/${params.id}`)
        .then(res => {
          console.log(res.data);
          setNewProduct(res.data)
          setImageFile(`${SERVERURL}/Static/${res.data.image}`)
          setImageData(`${SERVERURL}/Static/${res.data.image}`)
        })
    }
  }, [])

  const add = () => {
    if (newProduct.name == "" || newProduct.price == 0 || newProduct.categoryId == 0) {
      alert("חסרים נתונים");
      return;
    }
    const 
    
    formData = new FormData();
    formData.append('image', imageFile);
    if (!imageFile) {
      alert("בעיה בהעלאת תמונה")
      return;
    }
    axios.post(`${SERVERURL}/api/Product/uploadImage`, formData)
      .then(response => {
        console.log(response.data.imageName);

        return axios.post(`${SERVERURL}/api/Product/addproduct`, { ...newProduct, image: response.data.imageName }
          , { headers: { Authorization: `Bearer ${ctx.token}` } });
      })
      .then(ans => {
        console.log(ans);
        if (ans.data) {
          alert("המוצר נוסף בהצלחה!");
        } else {
          alert("שגיאה");
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        alert(" אירעה שגיאה!");
      });

  }
const update = () => {  
  if (imageFile instanceof File) {
    
    // אם יש תמונה חדשה, מעלים אותה קודם
    const formData = new FormData();
    formData.append('image', imageFile);

    axios.post(`${SERVERURL}/api/Product/uploadImage`, formData)
      .then(response => {
        const updatedProduct = { ...newProduct, image: response.data.imageName };
        return axios.post(`${SERVERURL}/api/Product/update`, updatedProduct, {
          headers: { Authorization: `Bearer ${ctx.token}` }
        });
      })
      .then(ans => {
        if (ans.data) {
          console.log('Product updated successfully with new image:', ans.data);
          alert("המוצר עודכן בהצלחה כולל התמונה!");
        } else {
          console.log('Product update failed after image upload:', ans.data);
          alert("יש בעיה בעדכון המוצר לאחר העלאת התמונה");
        }
      })
      .catch(error => {
        console.error('Error uploading image or updating product:', error);
        alert("שגיאה בהעלאת התמונה או בעדכון המוצר – בדוק קונסול");
      });
  } else {
    // אין תמונה חדשה, רק מעדכנים את המוצר
    axios.post(`${SERVERURL}/api/Product/update`, newProduct, {
      headers: { Authorization: `Bearer ${ctx.token}` }
    })
      .then(ans => {
        if (ans.data) {
          console.log('Product updated successfully without image:', ans.data);
          alert("המוצר עודכן בהצלחה!");
        } else {
          console.log('Product update failed without image:', ans.data);
          alert("יש בעיה בעדכון המוצר");
        }
      })
      .catch(error => {
        console.error('Error updating product without image:', error);
        alert("שגיאה בעדכון המוצר – בדוק קונסול");
      });
  }
};


  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
      <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
        <Grid display="flex" flexDirection="column" style={{ width: 750, marginTop: 10, marginBottom: 50, marginRight: 170, marginLeft: 170 }}>
          {params.id == 0 ? <Typography variant="h4" align="right">הוספת מוצר</Typography>
            : <Typography variant="h4" align="right">עריכת מוצר</Typography>}
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
            <Box >  {imageFile && <img src={imageData} alt="Uploaded" style={{ marginRight: 20, width: 150, height: 150 }} />}
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
                placeholder="לדוגמא: מתנפח 9-ליצנים" onChange={(ev) => handleChange('name', ev.target.value)} />
              <InputLabel>תאור</InputLabel>
              <TextField multiline
                value={newProduct.description}
                rows={4} size="small" sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  }, width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                placeholder="לדוגמא: מתאים ליומולדת" onChange={(ev) => handleChange('description', ev.target.value)} />

            </Grid>
            <Grid item xs={4}>
              <InputLabel>מחיר</InputLabel>
              <TextField size="small"
                value={newProduct.price}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ש"ח</InputAdornment>,
                }} sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none',
                  }, width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                onChange={(ev) => handleChange('price', ev.target.value)} />
              <InputLabel>מחיר מיוחד</InputLabel>
              <TextField size="small"
                value={newProduct.specialPrice}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ש"ח</InputAdornment>,
                }} sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none',
                  }, width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                }}
                onChange={(ev) => handleChange('specialPrice', ev.target.value)} />
              <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
              <Select
                sx={{
                  '& .MuiSelect-icon': { right: 'auto', left: 8 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  },
                }}
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
                <TextField
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
                    }, width: 70, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                  }} />
                <TextField
                  value={newProduct.width} size="small" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 80, marginBottom: 2, marginLeft: 0, backgroundColor: theme.palette.customColor
                  }}
                  onChange={(ev) => handleChange('width', ev.target.value)} />
                <TextField disabled
                  size="small" defaultValue="x" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 70, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                  }} />
                <TextField
                  value={newProduct.height} size="small" sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none', // Hides the default outline
                    }, width: 80, marginBottom: 2, marginLeft: 0, backgroundColor: theme.palette.customColor
                  }}
                  onChange={(ev) => handleChange('height', ev.target.value)} />
              </Grid>
              <InputLabel>הערה</InputLabel>
              <TextField multiline
                value={newProduct.comment}
                rows={4} size="small" fullWidth sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none', // Hides the default outline
                  }, width: 180, backgroundColor: theme.palette.customColor
                }}
                placeholder="לדוגמא: הוראות הפעלה" onChange={(ev) => handleChange('comment', ev.target.value)} />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row" mt={3}>
            {params.id == 0 ?
              <Button variant="contained" style={{ backgroundColor: theme.palette.blueColor, width: "70%", borderRadius: 12, marginLeft: 20 }}
                onClick={add}>הוסף</Button>
              : <Button variant="contained" style={{ backgroundColor: theme.palette.blueColor, width: "70%", borderRadius: 12, marginLeft: 20 }}
                onClick={update}>עדכון</Button>}
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
export default UpdateProduct;