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
import Orders from './client/Order';
import SignUp from './client/SignUp';
import Contact from './client/Contact';
// import SimpleSlider from './client/SliderImgs';//admin
import HomeAd from './admin/HomeAd';
import AddProducts from './admin/AddProducts';
import MyClient from './admin/MyClients';
import AllOrders from './admin/AllOrders';
import Product from './common/Product';
import SignIn from './common/SignIn';
import Order from './client/Order';
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
import { yellow } from '@mui/material/colors';
import '@fontsource/varela-round';
import Image from "./pictures/background.png"
import { SocialLinks } from './SocialLinks';
const yellowColor = yellow[50]
const styles = {
  paperContainer: {
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
      url(${SERVERURL}/Static/background.png)`,
      backgroundSize:"50%",
      
  }
};
const theme = createTheme({
  typography: {
    fontFamily: 'Varela Round, sans-serif',
    direction: 'rtl',
  },
});

function App() {

  return (<div style={styles.paperContainer}>
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="homeAd" element={<HomeAd />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="myclients" element={<MyClient />} />
          <Route path="allorders/:id" element={<AllOrders />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="updateuser" element={<UpdateUser />} />
          <Route path="/album" element={<Album />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='cart/:id' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='contact' element={<Contact />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='day' element={<Day />} />
        </Routes>
        <Copyright />
      </Router>
    </ThemeProvider>
  </div>
  )
}

export default App;
