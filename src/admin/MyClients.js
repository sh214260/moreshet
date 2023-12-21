import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Paper } from '@mui/material';

function MyClient() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let start = async () => {
      console.log("data")
      const response = await axios.get(`https://localhost:7128/api/User`);
      console.log(response.data);
      setClients(response.data);
    }
    start();
  }, []);

  return (
    <Paper>
      <Typography variant="h3">הלקוחות שלי</Typography>
      <Table >
        <TableHead >
          <TableRow >
            <TableCell style={{textAlign:"right"}}>מספר לקוח</TableCell>
            <TableCell style={{textAlign:"right"}}>שם</TableCell>
            <TableCell style={{textAlign:"right"}}>מייל</TableCell>
            <TableCell style={{textAlign:"right"}}>סוג</TableCell>
            <TableCell style={{textAlign:"right"}}>כתובת</TableCell>
            <TableCell style={{textAlign:"right"}}>טלפון1</TableCell>
            <TableCell style={{textAlign:"right"}}>טלפון 2</TableCell>
            <TableCell style={{textAlign:"right"}}>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((user) => (
            <TableRow key={user.id}>
              <TableCell style={{textAlign:"right"}}>{user.id}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.name}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.email}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.type}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.address}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.phoneNumber1}</TableCell>
              <TableCell style={{textAlign:"right"}}>{user.phoneNumber2}</TableCell>
              <TableCell style={{textAlign:"right"}}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/allorders/${user.id}`)}
                 >
                  לצפייה בהזמנות קודמות
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default MyClient;
