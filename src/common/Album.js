import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as A } from 'react-router-dom';
import { Link } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function Album() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([{}])
  const [displayedProducts, setDisplayedProducts] = useState(3);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  function filter() {

    let filtered = products.slice(0, displayedProducts);

    if (categoryId === "") {
      filtered = products;
    } else {
      filtered = products.filter((product) => product.categoryId === categoryId);
    }

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }

  useEffect(() => {
    let start = async () => {
      const response = await axios.get('https://localhost:7128/api/Product/getall')
      const data = await response.data
      console.log(data)
      setProducts(data)
      setFilteredProducts(data.slice(0, displayedProducts))
    }
    start()
    axios.get('https://localhost:7128/api/Category/Get')
      .then(res => {
        console.log(res.data)
        setCategorys(res.data)
      })

  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              קטלוג מוצרים
            </Typography>
            <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" >
                הכל
              </MenuItem>
              {categorys.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="demo-simple-select-filled-label">מחיר</InputLabel>
            <Button size="small" onClick={() => setSortOrder('asc')}>מהנמוך לגבוה</Button>
            <Button size="small" onClick={() => setSortOrder('desc')}>מהגבוה לנמוך</Button>
            <Button size="small" onClick={filter}>בצע סינון</Button>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {filteredProducts.map((card) => (
              // <A key={card.id} to={`/product/${card.id}`}>
              <Grid key={card.id} item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}>
                    <A to={`/product/${card.id}`}>
                      <img src="https://source.unsplash.com/random?wallpapers" />
                    </A>
                  </CardMedia>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => navigate(`/product/${card.id}`)} size="small">הוסף לעגלה</Button>
                  </CardActions>
                </Card>
              </Grid>

            ))}
          </Grid>
        </Container>
        <Button onClick={() => {
          setDisplayedProducts(displayedProducts + 2);
          setFilteredProducts(products.slice(0, displayedProducts))
        }}>Load More</Button>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}