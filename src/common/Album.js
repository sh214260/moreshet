import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { DataContext } from '../client/data-context'
import { useContext } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import MainPage from './MainPage';
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
  const currentDate = dayjs(); // Get the current date
  const navigate = useNavigate()
  const ctx = useContext(DataContext)
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([{}])
  const [displayedProducts, setDisplayedProducts] = useState(6);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState('')

  let filterByDate = async () => {
    const response = await axios.get(`https://localhost:7128/api/Product/getavailable/${ctx.cart.fromDate}/${ctx.cart.toDate}`)
    const data = await response.data
    console.log(data)
    setFilteredProducts(data)
  }

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
    if (ctx.user == null) {
      let guest = {
        id: 0, name: 'אורח', email: '', adress: ''
        , phoneNumber1: '', phoneNumber2: '', type: 0
      }
    }
    if (ctx.cart?.toDate == null || ctx.cart?.fromDate == null) {
      setOpenAlert(true)
    }
    else {
      setOpenAlert(false)
    }
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

  }, [ctx.cart?.toDate])
  return (<>
  <MainPage/>
    <Collapse in={openAlert} sx={{
      height: "80%",
      width: "80%"
    }}>
      <Alert severity="info"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          mb: 2,

        }}
      >
        שים לב, לא בחרת תאריך להזמנה!
      </Alert>
    </Collapse>
    <CssBaseline />
    <Grid>
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
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    // pt: '56.25%',
                  }}>
                  <A to={`/product/${card.id}`}>
                    <img height={200} src="https://source.unsplash.com/random?wallpapers" />
                  </A>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                  <Typography>
                    {card.description}
                  </Typography>

                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography style={{ order: 1, margin: 14 }}>
                    {card.price} ₪
                  </Typography>
                  <Button onClick={() => navigate(`/product/${card.id}`)} size="small" style={{ order: 2, margin: 4 }}>הצג</Button>
                </CardActions>

              </Card>
            </Grid>

          ))}
        </Grid>
        <Button style={{ margin: 'auto', display: 'block', fontSize: '1.2em' }} onClick={() => {
          const updatedDisplayedProducts = displayedProducts + 3;
          setDisplayedProducts(updatedDisplayedProducts);
          setFilteredProducts(products.slice(0, updatedDisplayedProducts))
        }}>טען עוד</Button>
      </Container>

    </Grid>
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
  </>)
}