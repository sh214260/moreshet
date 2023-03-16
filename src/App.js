import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './client/HomePage';
import Login from './client/Login'
import Products from './client/Products';
import Orders from './client/Orders';
import Singup from './client/Singup';
import Item from './client/Item'
//admin
import HomeAd from './admin/HomeAd';
import AddProducts from './admin/AddProducts';
import MyClient from './admin/MyClients';
import Video from './client/Video';

function App() {

  return (<div>

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} >
          <Route path="/" exact element={<Video />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="products/:category/:productId" element={<Item />} />

          <Route path="orders" element={<Orders />} > </Route>
          <Route path="login" element={<Login />} />
          <Route path="singup" element={<Singup />} />
         
          <Route path="homeAd" element={<HomeAd />}></Route>
            <Route path="addProducts" element={<AddProducts />} /> 
            <Route path="myclients" element={<MyClient />} />
          
        </Route>{/**/}
      </Routes>
    </Router>
  </div>
  )
}

export default App;
