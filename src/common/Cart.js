import React, { useContext, useState, useEffect } from "react";
import { DataContext } from '../client/data-context';

const Cart = () => {
  const context = useContext(DataContext);
  const cartItems = context.items;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // עדכון המחיר הסופי בכל שינוי ברשימת המוצרים בעגלה
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.item.price;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div>
      <h2>Shopping Cart</h2>     
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>שם</th>
              <th>מחיר</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item.name}</td>
                <td>{item.item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default Cart;