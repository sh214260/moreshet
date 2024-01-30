import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context'
import MainPage from "./MainPage";
import Nav from "./Nav";
import { Copyright } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 13,
        // border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
const Cart = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [flag, setFlag] = useState(0)
    const ctx = useContext(DataContext)
    // ctx.setCartId(params.id)
    function DeleteProduct(productId) {
        axios.post(`${SERVERURL}/api/CartProduct/delete/${ctx.cart.id}/${productId}`)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setFlag(flag+1)
                }
                else {
                    alert("המחיקה לא התבצעה כראוי")
                }
            })   
    }
    useEffect(() => {
        axios.get(`${SERVERURL}/api/CartProduct/getproducts/${ctx.cart.id}`)
        .then(ans=>{
            console.log(ans.data)
            ctx.setCartProducts(ans.data)})
        axios.get(`${SERVERURL}/api/Cart/getbyid/${ctx.cart.id}`)
        .then(res => {
        console.log(res.data)
        ctx.setCart(res.data)
        params.id=ctx.cart.id
      })
    }, [ctx.cart.fromDate ,flag])

    return (
        <>
        <Box sx={{ margin: 2 }} >      
            <AppBar sx={{ width: '50%', marginTop: 1, marginBottom: 1 }} position="sticky">
                <Toolbar sx={{ width: 550, display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="h5" marginLeft={2}>המוצרים בהזמנה</Typography>
                    <IconButton aria-label="cart" >
                        <StyledBadge badgeContent={ctx.cartProducts.length} color="secondary">
                            <ShoppingCartIcon fontSize="large" />
                        </StyledBadge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {ctx.cartProducts.length > 0 ? (
                    ctx.cartProducts.map(product => (
                        <Card key={product.id} sx={{ width: '50%', marginTop: 2, marginBottom: 2 }} variant="outlined">
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={`${SERVERURL}/Static/${product.image}.png`}
                                    alt="Live from space album cover"
                                />
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {product.name}
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{ flex: '1 0 ', justifyItems:'flex-end'}}>
                                    <Typography component="div" variant="h5">
                                        {product.price}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        לפני הנחה
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{ flex: '1 0 ', display: 'flex', flexDirection: 'row' }}>
                                    <IconButton onClick={() => DeleteProduct(product.id)}>
                                        <CloseIcon  fontSize="large" />
                                    </IconButton>
                                </CardContent>
                            </Box>
                        </Card>))) : (

                    <Grid item xs={12} sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h5">עדיין לא הוספת מוצרים</Typography>
                    </Grid>
                )}
                <Box sx={{ width: '30%', marginRight: 10 }}>
                    <Card sx={{ marginBottom: 2 }} variant="outlined">
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography variant="h5">סה"כ לתשלום: {ctx.cart.totalPrice}</Typography>
                                <Typography variant="h6"></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    disabled={ctx.cart.totalPrice === 0}
                                    sx={{ width: '100%', marginTop: 2 }}
                                    onClick={()=>{
                                        if(ctx.cart.totalPrice==0){
                                           return;
                                        }
                                        navigate('../checkout')}}
                                >
                                    מעבר לתשלום
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    disabled={false}
                                    sx={{ width: '100%', marginTop: 2, marginRight: 1 }}
                                    onClick={()=>navigate('../album')}
                                >
                                    המשך קנייה
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
        </>);
};

export default Cart;




