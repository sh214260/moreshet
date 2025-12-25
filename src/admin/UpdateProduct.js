import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataContext, SERVERURL, IMAGE_BASE_URL } from "../client/data-context";
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
    setImageFile(null);
    setImageData('');
  }

  // ולידציה של שדות המוצר
  const validateProduct = () => {
    if (!newProduct.name || newProduct.name.trim() === '') {
      alert('חסר שם מוצר');
      return false;
    }
    if (!newProduct.price || newProduct.price <= 0) {
      alert('חסר מחיר תקין');
      return false;
    }
    if (!newProduct.categoryId || newProduct.categoryId === 0) {
      alert('חסרה קטגוריה');
      return false;
    }
    return true;
  }

  // העלאת תמונה חדשה לשרת
  const uploadNewImage = async () => {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(`${SERVERURL}/api/Product/uploadImage`, formData);
      
      if (!response.data.image) {
        throw new Error('השרת לא החזיר URL תמונה תקין');
      }

      console.log('✅ Image uploaded successfully:', response.data.image);
      return response.data.image;
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      throw new Error('שגיאה בהעלאת התמונה לשרת');
    }
  }

  // שמירת מוצר חדש
  const saveNewProduct = async (imageUrl) => {
    const productToAdd = { ...newProduct, image: imageUrl };
    
    try {
      const response = await axios.post(
        `${SERVERURL}/api/Product/addproduct`,
        productToAdd,
        { headers: { Authorization: `Bearer ${ctx.token}` } }
      );

      if (response.data) {
        alert('המוצר נוסף בהצלחה!');
        reset();
        return true;
      } else {
        alert('השם של התמונה מופיע כבר במערכת, נסה שם אחר');
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving product:', error);
      throw new Error('שגיאה בשמירת המוצר');
    }
  }

  // עדכון מוצר קיים
  const updateExistingProduct = async (imageUrl) => {
    const productToUpdate = { ...newProduct, image: imageUrl };
    
    try {
      const response = await axios.put(
        `${SERVERURL}/api/Product/update`,
        productToUpdate,
        { headers: { Authorization: `Bearer ${ctx.token}` } }
      );

      if (response.data) {
        alert('המוצר עודכן בהצלחה!');
        return true;
      } else {
        alert('יש בעיה בעדכון המוצר');
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw new Error('שגיאה בעדכון המוצר');
    }
  }
  // טיפול בבחירת קובץ תמונה חדש
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // בדיקת סוג הקובץ
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('אנא העלה תמונה בפורמט PNG או JPEG בלבד');
      return;
    }

    // שמירת הקובץ להעלאה מאוחר יותר
    setImageFile(file);
    
    // יצירת תצוגה מקדימה
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result); // base64 לתצוגה
    }
    reader.readAsDataURL(file);

    console.log('📁 New image file selected:', file.name);
  };
  useEffect(() => {
    // טעינת קטגוריות
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error loading categories:', err));

    // טעינת מוצר קיים למצב עריכה
    if (params.id != 0) {
      axios.get(`${SERVERURL}/api/Product/getbyid/${params.id}`)
        .then(res => {
          console.log('🔍 Product loaded from server:', res.data);
          
          setNewProduct(res.data);
          
          // הגדרת תצוגת התמונה הקיימת - שימוש ב-fullImageUrl
          if (res.data.fullImageUrl && res.data.fullImageUrl !== 'null' && res.data.fullImageUrl !== '') {
            setImageData(res.data.fullImageUrl); // Full Azure URL
            console.log('✅ Existing image loaded:', res.data.fullImageUrl);
          } else {
            setImageData('');
            console.log('⚠️ No image found for product');
          }
          
          // אין קובץ חדש במצב עריכה
          setImageFile(null);
        })
        .catch(err => {
          console.error('Error loading product:', err);
          alert('שגיאה בטעינת המוצר');
        });
    }
  }, []);


  // הוספת מוצר חדש
  const add = async () => {
    console.log('➕ ADD FUNCTION CALLED');
    
    // ולידציה של שדות המוצר
    if (!validateProduct()) {
      return;
    }

    // בדיקה שנבחרה תמונה
    if (!imageFile) {
      alert('חובה להעלות תמונה למוצר חדש');
      return;
    }

    try {
      // העלאת התמונה לשרת
      console.log('📤 Uploading image:', imageFile.name);
      const imageUrl = await uploadNewImage();
      
      if (!imageUrl) {
        alert('שגיאה בהעלאת התמונה');
        return;
      }

      // שמירת המוצר עם ה-URL של התמונה
      console.log('💾 Saving new product with image:', imageUrl);
      await saveNewProduct(imageUrl);
      
    } catch (error) {
      console.error('❌ Error in add function:', error);
      alert(error.message || 'אירעה שגיאה בהוספת המוצר');
    }
  }

  // עדכון מוצר קיים
  const update = async () => {
    console.log('🔄 UPDATE FUNCTION CALLED');
    console.log('📁 Has new image file:', !!imageFile);
    console.log('🖼️ Current product image:', newProduct.image);
    
    // ולידציה של שדות המוצר
    if (!validateProduct()) {
      return;
    }

    try {
      let imageUrl = newProduct.image; // תמונה קיימת כברירת מחדל

      // אם נבחר קובץ חדש - העלה אותו
      if (imageFile instanceof File) {
        console.log('📤 Uploading NEW image:', imageFile.name);
        const newImageUrl = await uploadNewImage();
        
        if (!newImageUrl) {
          alert('שגיאה בהעלאת התמונה החדשה');
          return;
        }
        
        imageUrl = newImageUrl;
        console.log('✅ New image uploaded:', imageUrl);
      } else {
        console.log('✅ Keeping existing image:', imageUrl);
      }

      // עדכון המוצר
      console.log('💾 Updating product with image:', imageUrl);
      await updateExistingProduct(imageUrl);
      
    } catch (error) {
      console.error('❌ Error in update function:', error);
      alert(error.message || 'אירעה שגיאה בעדכון המוצר');
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
            <Box >  {imageData && <img src={imageData} alt="Uploaded" style={{ marginRight: 20, width: 150, height: 150 }} />}
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