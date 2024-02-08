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
import { PickersLayout } from "@mui/x-date-pickers";

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
        axios.post(`${SERVERURL}/api/CartProduct/delete/${ctx.cart.id}/${productId}`
        ,{headers: { Authorization: `Bearer ${ctx.token}`}}
        )
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setFlag(flag + 1)
                }
                else {
                    alert("המחיקה לא התבצעה כראוי")
                }
            })
    }
    useEffect(() => {
        // axios.interceptors.response.use(response => {
        //     return response;
        // }, error => {
        //     console.log('error', error, error.response);
        //     if(error.response.status == 401){
        //         alert('please login')
        //     }
        // })
        axios.get(`${SERVERURL}/api/CartProduct/getproducts/${ctx.cart.id}`
         ,{headers: { Authorization: `Bearer ${ctx.token}`}}
        )
            .then(ans => {
                console.log(ans);
                console.log(ans.data)
                ctx.setCartProducts(ans.data)
            }).catch(err=>{
                alert('please login');
                navigate("/signin");
            })
        axios.get(`${SERVERURL}/api/Cart/getbyid/${ctx.cart.id}`
             , { headers: { Authorization: `Bearer ${ctx.token}` } }
            )
            .then(res => {
                console.log(res.data)
                ctx.setCart(res.data)
                params.id = ctx.cart.id
            })
    }, [flag])

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
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                        {ctx.cartProducts.length > 0 ? (
                            ctx.cartProducts.map(product => (
                                <Card key={product.id} sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 70, height: 70 }}
                                            image={`${SERVERURL}/Static/${product.image}.png`}
                                            alt="Live from space album cover"
                                        />
                                        
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h6">
                                                {product.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {product.name}
                                            </Typography>
                                        </CardContent>
                                        <CardContent sx={{ flex: '1 0 ', justifyItems: 'flex-end' }}>
                                            <Typography component="div" variant="h6">
                                                {product.price}
                                            </Typography>
                                            {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                                        לפני הנחה
                                    </Typography> */}
                                        </CardContent>
                                        <CardContent sx={{ flex: '1 0 ', justifyItems: 'left' }}>
                                            <IconButton onClick={() => DeleteProduct(product.id)}>
                                                <CloseIcon fontSize="large" />
                                            </IconButton>
                                        </CardContent>
                                    </Box>
                                </Card>))) : (

                            <Grid item xs={12} sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="h5">עדיין לא הוספת מוצרים</Typography>
                            </Grid>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', marginRight: 10 }}>
                        <Card variant="outlined" sx={{ height: 150, width: 300 }}>
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
                                        onClick={() => {
                                            if (ctx.cart.totalPrice == 0) {
                                                return;
                                            }
                                            navigate('../checkout')
                                        }}
                                    >
                                        מעבר לתשלום
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        disabled={false}
                                        sx={{ width: '100%', marginTop: 2, marginRight: 1 }}
                                        onClick={() => navigate('../album')}
                                    >
                                        המשך קנייה
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box></Grid>

            </Box>
        </>);
};

export default Cart;




