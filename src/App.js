import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//common
import MainPage from './common/MainPage';
// Example import statement
import Album from './common/Album';
import Cart from './common/Cart';
import SignUp from './client/SignUp';
import Contact from './client/Contact';
import HomeAd from './admin/HomeAd';
import UpdateProduct from './admin/UpdateProduct';
import Product from './common/Product';
import SignIn from './common/SignIn';
import Checkout from './common/Checkout';
import UpdateUser from './client/UpdateUser';
import { DataContext, SERVERURL, IMAGE_BASE_URL } from './client/data-context';
import { useContext } from "react";
import Nav from './common/Nav';
import Copyright from './common/Copyright';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '@fontsource/varela-round';
import theme from './theme';
import LoginForUser from './admin/LoginForUser';
import DashboardAdmin from './admin/DashboardAdmin';
import OrderByDay from './admin/OrdersByDay';
import OrderDetails from './admin/OrderDetails';
import ToolbarDash from './admin/ToolBarDash';
import MyClients from './admin/MyClients';
import OrderByUser from './admin/OrdersByUser';
import AllProducts from './admin/AllProducts';

const styles = {
  paperContainer: {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
      url(${IMAGE_BASE_URL}/Static/background.png)`,
    backgroundSize: "50%",
  }
};

function App() {
  const context = useContext(DataContext)
  console.log(context.role);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.paperContainer}>
        <Router>
          {context.role == "client" ?
            <>
              <Nav />
              <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
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
              </div>
            </> :
            <>
              <DashboardAdmin />
              <div style={{ display: "flex", justifyContent: "right" }}>
                <div style={{ width: "15%", backgroundColor: "white", minHeight: "100vh", overflowY: "auto" }}>
                  <ToolbarDash />
                </div>
                <div style={{ flex: 1, backgroundColor: theme.palette.background.light, overflow: "auto" }}>
                  <Routes >
                    <Route path='/' element={<HomeAd />} />
                    <Route path='loginforuser' element={<LoginForUser />} />
                    <Route path="updateProduct/:id" element={<UpdateProduct />} />
                    <Route path='orderdetails/:id' element={<OrderDetails />} />
                    <Route path="/orderByDate" element={<OrderByDay />} />
                    <Route path='loginForUser' element={<LoginForUser />} />
                    <Route path='myclients' element={<MyClients />} />
                    <Route path='allProducts' element={<AllProducts />} />
                    <Route path='orderByUser/:id' element={<OrderByUser />} />
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
      </div >
    </ThemeProvider>
  )
}

export default App;
