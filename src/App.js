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
import { DataContext, SERVERURL } from './client/data-context';
import { useContext } from "react";
import Nav from './common/Nav';
import Copyright from './common/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, yellow } from '@mui/material/colors';
import '@fontsource/varela-round';
import LoginForUser from './admin/LoginForUser';
import DashboardAdmin from './admin/DashboardAdmin';
import OrderByDay from './admin/OrdersByDay';
import OrderDetails from './admin/OrderDetails';
import ToolbarDash from './admin/ToolBarDash';
import MyClients from './admin/MyClients';
import OrderByUser from './admin/OrdersByUser';
import AllProducts from './admin/AllProducts';

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
              <div style={{ display: "flex", justifyContent: "right" }}>
                <div style={{ flex: 1, width: "20%", backgroundColor: "white" }}>
                  <ToolbarDash />
                </div>
                <div style={{ flex: 1, backgroundColor: theme.palette.customColor }}>
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
      </ThemeProvider>
    </div >
  )
}

export default App;
