import React, { useEffect, useState } from "react";
import axios from 'axios';
function MyClient() {
  const [clients, setClients] = useState([])
  useEffect(() => {
    let start = async () => {
      console.log("data")
      const response = await axios.get(`https://localhost:7128/api/User`)
      console.log(response.data)
      setClients(response.data);
    }
    start()
  }, [])
  return (
    <div >
      <h1>הלקוחות שלי</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>שם</th>
            <th>מייל</th>
            <th>סיסמה</th>
            <th>סוג</th>
            <th>כתובת</th>
            <th>טלפון1</th>
            <th>טלפון 2</th>
            {/* <th>הזמנות קודמות</th> */}
          </tr></thead>
        <tbody>
          {clients.map(user => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.type}</td>
                <td>{user.adress}</td>
                <td>{user.phoneNumber1}</td>
                <td>{user.phoneNumber2}</td>
                <td><button>לצפייה בהזמנות קודמות</button></td>
              </tr>
            )
          })}          
        </tbody>
      </table>
    </div>
  );
}
export default MyClient;