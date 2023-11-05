import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//common
import MainPage from './common/MainPage';
import Login from './common/Login'
import Video from './common/Video';
import Catalog from './common/Catalog';
import Album from './common/Album';
import Cart from './common/Cart';
import HomePage from './client/HomePage';
import Products from './client/Products';
import Orders from './client/Order';
// import Singup from './client/SignUp';
import SignUp from './client/SignUp';
import Item from './client/Item'
//admin
import HomeAd from './admin/HomeAd';
import AddProducts from './admin/AddProducts';
import MyClient from './admin/MyClients';
import AllOrders from './admin/AllOrders';
import Product from './common/Product';
import SignIn from './common/SignIn';
import Order from './client/Order';

function App() {

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
        <Route path="catalog" element={<Catalog />} />
        <Route path="/album" element={<Album />} />
        <Route path='product/:id' element={<Product />} />   
        <Route path='cart/:id' element={<Cart />} /> 
        <Route path='order' element={<Order/>} />  
      </Routes>
    </Router>
  </div>
  )
}

export default App;
