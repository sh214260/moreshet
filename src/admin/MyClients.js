import React, { useEffect, useState } from "react";

function MyClient() {
const [clients,setClients]=useState([])
  useEffect(() => {
    let start = async () => {
      console.log("data")
      const response = await fetch(`http://localhost:3500/myclients`)
      
      const data = await response.json()
setClients(data);
      console.log(data)
      console.log("it")
    }
    start()
  }, [])
  return (
    <div >
      <h1>הלקוחות שלי</h1>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>טלפון</th>
            <th>מייל</th>
            <th>סיסמה</th>
          </tr></thead>
        <tbody>
          {clients.map(user=>{return(
            <tr> 
              <td>{user.username}</td>
              <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.userpassword}</td>
           
          </tr>
          )})
          
}</tbody>
      </table>
    </div>
  );
}
export default MyClient;