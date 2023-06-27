import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//common
import MainPage from './common/MainPage';
import Login from './common/Login'
import Video from './common/Video';
import Catalog from './common/Catalog';
import Cart from './common/Cart';
import HomePage from './client/HomePage';
import Products from './client/Products';
import Orders from './client/Orders';
import Singup from './client/Singup';
import Item from './client/Item'
//admin
import HomeAd from './admin/HomeAd';
import AddProducts from './admin/AddProducts';
import MyClient from './admin/MyClients';
import AllOrders from './admin/AllOrders';
import Product from './common/Product';

function App() {

  return (<div>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="homeAd" element={<HomeAd />} />
        <Route path="addProducts" element={<AddProducts />} />
        <Route path="myclients" element={<MyClient />} />
        <Route path="allorders" element={<AllOrders />} />
        <Route path="singup" element={<Singup />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path='product/:id' element={<Product />} />   
        <Route path='cart' element={<Cart />} />      
      </Routes>
    </Router>
  </div>
  )
}

export default App;
