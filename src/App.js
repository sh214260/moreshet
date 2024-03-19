import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//common
import MainPage from './common/MainPage';
import Video from './common/Video';
// Example import statement
import Album from './common/Album';
import Cart from './common/Cart';
import SignUp from './client/SignUp';
import Contact from './client/Contact';
// import SimpleSlider from './client/SliderImgs';//admin
import HomeAd from './admin/HomeAd';
import AddProduct from './admin/AddProduct';
import MyClient from './admin/MyClients';
import AllOrders from './admin/AllOrders';
import Product from './common/Product';
import SignIn from './common/SignIn';
import Checkout from './common/Checkout';
import UpdateUser from './client/UpdateUser';
import { useEffect } from 'react';
import { DataContext, SERVERURL } from './client/data-context';
import { useState, useContext } from "react";
import axios from 'axios';
import Tasks from './admin/Tasks';
import Day from './admin/Day';
import Nav from './common/Nav';
import Copyright from './common/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, yellow } from '@mui/material/colors';
import '@fontsource/varela-round';
import Image from "./pictures/background.png"
import { SocialLinks } from './SocialLinks';
import LoginForUser from './admin/LoginForUser';
import DashboardAdmin from './admin/DashboardAdmin';
import { colors } from '@mui/material';
import { Add, ChatBubble } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AppBar, Avatar, Box, Grid, IconButton, Link, Paper, Toolbar, Typography } from "@mui/material";
import OrderByDay from './admin/OrdersByDay';
import OrderDetails from './admin/OrderDetails';
import zIndex from '@mui/material/styles/zIndex';
import ToolbarDash from './admin/ToolBarDash';
const yellowColor = yellow[50]
const styles = {
  paperContainer: {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
      url(${SERVERURL}/Static/background.png)`,
    backgroundSize: "50%",
  }
};

const theme = createTheme({
  typography: {
    fontFamily: 'Assistant',
    // fontFamily: 'Varela Round, sans-serif',
    direction: 'rtl',
  },
  palette: {
    customColor: 'rgba(242, 247, 255, 1)',
    blueColor: 'rgba(0, 84, 238, 1)'
  },
});

function App() {
  const color = indigo[50]
  const context = useContext(DataContext)
  console.log(context.role);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      axios.get(`${SERVERURL}/api/User/Profile`
        , { headers: { Authorization: `Bearer ${token}` } }) // Assuming this endpoint returns user data based on the token
        .then(response => {
          console.log(response.data);
          // context.setUser(response.data.user);
          // context.setCart(response.data.cart);
          // context.setCartProducts(response.data.cartProducts);
        })
        .catch(error => {
          console.error('Auto login failed:', error);
        });
    }
  }, []);
  return (
    <div style={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <Router>
          {context.role == "client" ?
            <>
              <Nav />
              <Routes>
                <>
                  <Route path="/" element={<MainPage />} exact />
                  <Route path="/album" element={<Album />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="updateuser" element={<UpdateUser />} />
                  <Route path='product/:id' element={<Product />} />
                  <Route path='cart/:id' element={<Cart />} />
                  <Route path='checkout' element={<Checkout />} />
                  <Route path='contact' element={<Contact />} />
                </>
              </Routes>
            </> :
            <>
              <DashboardAdmin />
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, width: "20%" }}>
                  <ToolbarDash /></div>
                <div style={{ flex: 1, backgroundColor: theme.palette.customColor }}>
                  <Routes >
                    <Route path='/' element={<HomeAd />} />
                    <Route path='loginforuser' element={<LoginForUser />} />
                    <Route path="addProduct" element={<AddProduct />} />
                    <Route path='orderdetails/:id' element={<OrderDetails />} />
                    <Route path="/orderByDate" element={<OrderByDay />} />
                    <Route path='loginForUser' element={<LoginForUser/>}/>
                    <Route path="/album" element={<Album />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="updateuser" element={<UpdateUser />} />
                    <Route path='product/:id' element={<Product />} />
                    <Route path='cart/:id' element={<Cart />} />
                    <Route path='checkout' element={<Checkout />} />
                  </Routes></div>
              </div>
            </>}
          <Copyright />
        </Router>
      </ThemeProvider>
    </div >
  )
}

export default App;
