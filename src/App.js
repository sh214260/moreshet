import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './client/HomePage';
import Login from './client/Login'
import Products from './client/Products';
import Orders from './client/Orders';
//import { createContext } from 'react';
import Singup from './client/Singup';
import Item from './client/Item'
//admin
import HomeAd from './admin/HomeAd';
import AddProducts from './admin/AddProducts';

function App() {

  return (<div>

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} >
          <Route path="products/:category" element={<Products />} >
            {/* <Route path="Item" element={<Item />}></Route>   */}
          </Route>
          <Route path="orders" element={<Orders />} > </Route>
          <Route path="login" element={<Login />} />
          <Route path="singup" element={<Singup />} />
          <Route path="homeAd" element={<HomeAd />}>
            <Route path="addProducts" element={<AddProducts />} />

          </Route>
          <Route>
            
          </Route>
        </Route>
      </Routes>
    </Router>
  </div>
  )
}

export default App;
