import React, { useEffect, useState } from "react";
import axios from 'axios';
function AllOrders() {
  const [orders, setOrders] = useState([])
  const [client,setClient]=useState({})
  useEffect(() => {
    let start = async () => {
      console.log("data")
      const response = await axios.get(`https://localhost:7128/api/Order`)
      console.log(response.data[0])
      setOrders(response.data);
      const res = await axios.get(`https://localhost:7128/api/User/${response.data[0].userId}`)
      console.log(res.data)
    }
    start()
  }, [])
  return (
    <div >
      <h1>הזמנות</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>מספר לקוח</th>
            <th>שם לקוח</th>
            <th>נשלח?</th>
            <th>תאריך הזמנה</th>
            <th>שולם?</th>
            <th>קבלה?</th>
            <th>מ</th>
            <th>עד</th>
            <th>מחיר סופי</th>
          </tr></thead>
        <tbody>
          {orders.map(order => {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{client.name}</td>
                <td>{order.isDelivery}</td>
                <td>{order.dateOrder}</td>
                <td>{order.paidUp}</td>
                <td>{order.receipt}</td>
                <td>{order.toDate}</td>
                <td>{order.fromDate}</td>
                <td>{order.totalPrice}</td>
              </tr>
            )
          })}          
        </tbody>
      </table>
    </div>
  );
}
export default AllOrders;