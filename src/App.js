import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//common
import MainPage from './common/MainPage';
import Login from './common/Login'
import Video from './common/Video';
// Example import statement
//import Cata from './common/Cata'
import Album from './common/Album';
import Cart from './common/Cart';
import HomePage from './client/HomePage';

import Orders from './client/Order';
// import Singup from './client/SignUp';
import SignUp from './client/SignUp';
//admin
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
import { DataContext } from './client/data-context';
import { useState, useContext } from "react";
import axios from 'axios';
function App() {
  const context = useContext(DataContext)
  useEffect(()=>{
    // axios.post(`https://localhost:7128/api/User/Signin`, { email: 'sh', password: 'sh' })
    // .then(ans => {
    //   console.log(ans.data)
    //   if (ans.data) {
    //     context.setUser(ans.data.user);
    //     context.setCart(ans.data.cart)
    //     context.setCartProducts(ans.data.cartProducts)
    //     console.log(context.cart)
    //     console.log(context.cartProducts)
       
    //   }
    //   else {
    //     alert("לא קיים משתמש כזה")
       
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   alert("invalid username or password")
    // }); // arrow function
  },[])

  return (<div>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="signin" element={<SignIn />} />
        <Route path="homeAd" element={<HomeAd />} />
        <Route path="addProducts" element={<AddProducts />} />
        <Route path="myclients" element={<MyClient />} />
        <Route path="allorders" element={<AllOrders />} />
        {/* <Route path="singup" element={<Singup />} /> */}
        <Route path="signup" element={<SignUp />} />
        <Route path="updateuser" element={<UpdateUser/>}/>
        {/* <Route path="catalog" element={<Cata />} /> */}
        <Route path="/album" element={<Album />} />
        <Route path='product/:id' element={<Product />} />   
        <Route path='cart/:id' element={<Cart />} /> 
        <Route path='checkout' element={<Checkout />} /> 
        {/* <Route path='order' element={<Order/>} />  */}
        {/* <Route path='groupbydate' element={<GroupByDate/>} /> */}
      </Routes>
    </Router>
  </div>
  )
}

export default App;
