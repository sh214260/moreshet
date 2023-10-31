import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
const Cart = () => {
  const params = useParams()
  const [cartItems, setCartItems] = useState()
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get(`https://localhost:7128/api/Product/getbyid/${params.id}`)
    const calculateTotalPrice = () => {

    };

    calculateTotalPrice();
  }, [cartItems]);

  return (
    <></>
    // <div>
    //   <h2>Shopping Cart</h2>     
    //   {cartItems.length === 0 ? (
    //     <p>Cart is empty</p>
    //   ) : (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>שם</th>
    //           <th>מחיר</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {cartItems.map((item, index) => (
    //           <tr key={index}>
    //             <td>hi</td>
    //             {/* <td>{item.item.name}</td>
    //             <td>{item.item.price}</td> */}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    //   <p>Total Price: {totalPrice}</p>
    // </div>
  );
};

export default Cart;




