import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
const Cart = () => {
  const params = useParams()
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  function DeleteProduct() {
    axios.post(`https://localhost:7128/api/CartProduct/delete/6/6`)
      .then(res =>
        console.log(res.data))
  }
  useEffect(() => {
    let start = async () => {
      const response = await axios.get(`https://localhost:7128/api/CartProduct/getproducts/${params.id}`)
      const data = await response.data
      console.log(data)
      setCartItems(data)
      console.log(cartItems)
    }
    // start()
  }, [cartItems])

  return (<Box sx={{ width: 550, margin: 2 }} >
    <AppBar sx={{ marginTop: 1, marginBottom: 1 }} position="sticky">
        <Toolbar sx={{ width: 550, display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h5">העגלה שלי</Typography>
            <IconButton>
                <Typography variant="span">6</Typography>
                <ShoppingCartIcon fontSize='large' />
            </IconButton>
        </Toolbar>
    </AppBar>
    <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    מכונת סוכר
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    תאור בלה בלה בלה
                </Typography>
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    מחיר
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    לפני הנחה
                </Typography>
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <IconButton>
                    <ModeIcon fontSize="large" />
                </IconButton>
                <IconButton >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            </CardContent>

        </Box>

    </Card>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
        {/* <IconButton sx={{ justifyContent: 'start' }}>
            <ArrowForwardIos fontSize="large" />
            <Typography component="div" variant="h5">חזרה לקטלוג המוצרים</Typography>
        </IconButton> */}
        <IconButton sx={{  }}>
            <Typography component="div" variant="h5">המשך הזמנה</Typography>
            <ArrowBackIosSharpIcon fontSize="large" />
        </IconButton>
    </Box>
</Box>);
};

export default Cart;




