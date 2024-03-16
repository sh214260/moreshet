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
import AddProducts from './admin/AddProducts';
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
});

function App() {
  const color = indigo[50]
  const ctx = useContext(DataContext)
  console.log(ctx.role);
 
  return (
    <div style={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/album" element={<Album />} />
            <Route path="addProducts" element={<AddProducts />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="orderByDate" element={<OrderByDay />} />
            <Route path='orderdetails' element={<OrderDetails/>}/>
          </Routes>
          {/* {ctx.role === "client" && (
            <Nav />
          )}
          {ctx.role === "secretary" && (
            <DashboardAdmin />
          )} */}
          {/* <Routes>
            {ctx.role === "client" && (
              <>
                <Route path="/" element={<MainPage />} exact />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="updateuser" element={<UpdateUser />} />
                <Route path="/album" element={<Album />} />
                <Route path='product/:id' element={<Product />} />
                <Route path='cart/:id' element={<Cart />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path='contact' element={<Contact />} />
              </>
            )}
            {ctx.role === "secretary" && (
              <>
                <Route path="homeAd" element={<HomeAd />} />
                <Route path='loginforuser' element={<LoginForUser />} />
                <Route path='uploadProduct' element={<UploadProduct/>}/>
                <Route path="addProducts" element={<AddProducts />} />
                <Route path="myclients" element={<MyClient />} />
                <Route path="allorders/:id" element={<AllOrders />} />
                <Route path="catalog" element={<Album />} />
              </>
            )}

          </Routes> */}
          {/* admin */}
          {/* <Routes>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="homeAd" element={<HomeAd />} />
            <Route path='loginforuser' element={<LoginForUser />} />
            <Route path="addProducts" element={<AddProducts />} />
            <Route path="myclients" element={<MyClient />} />
            <Route path="allorders/:id" element={<AllOrders />} />
            <Route path="catalog" element={<Album />} />
          </Routes> */}
          <Copyright />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App;
